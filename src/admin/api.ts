// Dev-server-only API behind the /admin page. It reads and writes src/data/drinks.json and
// src/assets/drinks/ on this machine. It is never part of `astro build`, so nothing here ships.
import { createHash } from 'node:crypto';
import { promises as fs } from 'node:fs';
import type { IncomingMessage, ServerResponse } from 'node:http';
import path from 'node:path';
import type { Plugin } from 'vite';
import {
  imagePattern,
  slugify,
  validateData,
  type DrinkData,
} from '../data/schema';

const BASE = '/admin/api/';
const MAX_BODY = 8 * 1024 * 1024;
const MAX_IMAGE = 5 * 1024 * 1024;
const LOOPBACK = new Set(['127.0.0.1', '::1', '::ffff:127.0.0.1']);

const signatures: Record<string, (bytes: Buffer) => boolean> = {
  '.jpg': (b) => b[0] === 0xff && b[1] === 0xd8,
  '.jpeg': (b) => b[0] === 0xff && b[1] === 0xd8,
  '.png': (b) =>
    b
      .subarray(0, 8)
      .equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])),
  '.webp': (b) =>
    b.subarray(0, 4).toString('ascii') === 'RIFF' &&
    b.subarray(8, 12).toString('ascii') === 'WEBP',
};

class HttpError extends Error {
  constructor(
    readonly status: number,
    message: string,
    readonly details?: string[],
  ) {
    super(message);
  }
}

function send(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

async function readJson(req: IncomingMessage): Promise<unknown> {
  if (
    !String(req.headers['content-type'] ?? '').startsWith('application/json')
  ) {
    throw new HttpError(415, 'Expected JSON.');
  }
  const chunks: Buffer[] = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > MAX_BODY) throw new HttpError(413, 'Request is too large.');
    chunks.push(chunk as Buffer);
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch {
    throw new HttpError(400, 'Request body is not valid JSON.');
  }
}

// Requests must come from this machine, from the admin page itself (custom header forces a CORS preflight
// that this server never approves), and from the same origin when the browser reports one.
function guard(req: IncomingMessage) {
  if (!LOOPBACK.has(req.socket.remoteAddress ?? ''))
    throw new HttpError(403, 'The admin API only answers on localhost.');
  if (req.headers['x-milesima-admin'] !== '1')
    throw new HttpError(403, 'Missing admin header.');
  const origin = req.headers.origin;
  if (origin && origin !== `http://${req.headers.host}`)
    throw new HttpError(403, 'Cross-origin request refused.');
}

export function adminApi(root: string): Plugin {
  const dataFile = path.join(root, 'src', 'data', 'drinks.json');
  const imageDir = path.join(root, 'src', 'assets', 'drinks');
  const imageUrl = (file: string) =>
    `/@fs/${path.join(imageDir, file).replace(/\\/g, '/').replace(/^\/+/, '')}`;
  const versionOf = (text: string) =>
    createHash('sha1').update(text).digest('hex');

  async function listImages() {
    const files = (await fs.readdir(imageDir))
      .filter((file) => imagePattern.test(file))
      .sort();
    return files.map((file) => ({ file, url: imageUrl(file) }));
  }

  async function getData() {
    const text = await fs.readFile(dataFile, 'utf8');
    return {
      data: JSON.parse(text) as DrinkData,
      version: versionOf(text),
      images: await listImages(),
    };
  }

  async function putData(body: unknown) {
    const { data, version } = (body ?? {}) as {
      data?: DrinkData;
      version?: string;
    };
    const current = await fs.readFile(dataFile, 'utf8');
    if (version !== versionOf(current)) {
      throw new HttpError(
        409,
        'drinks.json changed on disk since this page loaded. Reload to get the latest version.',
      );
    }
    const problems = validateData(data);
    if (problems.length)
      throw new HttpError(400, 'The data did not pass validation.', problems);
    const available = new Set((await listImages()).map((image) => image.file));
    const missing = data!.drinks.flatMap((drink) =>
      [drink.image, ...drink.formats.map((format) => format.image)].filter(
        (file) => file && !available.has(file),
      ),
    );
    if (missing.length)
      throw new HttpError(400, 'Some images do not exist.', [
        ...new Set(missing),
      ]);
    const text = `${JSON.stringify(data, null, 2)}\n`;
    const temp = `${dataFile}.${process.pid}.tmp`;
    await fs.writeFile(temp, text, 'utf8');
    await fs.rename(temp, dataFile);
    return { version: versionOf(text) };
  }

  async function postImage(body: unknown) {
    const { name, content } = (body ?? {}) as {
      name?: string;
      content?: string;
    };
    if (typeof name !== 'string' || typeof content !== 'string')
      throw new HttpError(400, 'Send a file name and content.');
    const rawExt = path.extname(name);
    const ext = rawExt.toLowerCase();
    const check = signatures[ext];
    if (!check) throw new HttpError(400, 'Use a JPG, PNG or WebP image.');
    const bytes = Buffer.from(content.replace(/^data:[^,]*,/, ''), 'base64');
    if (bytes.length === 0 || bytes.length > MAX_IMAGE)
      throw new HttpError(400, 'Images must be between 1 byte and 5 MB.');
    if (!check(bytes))
      throw new HttpError(
        400,
        'The file content does not match its extension.',
      );
    const base = slugify(path.basename(name, rawExt)) || 'drink';
    let file = `${base}${ext}`;
    for (
      let n = 2;
      await fs.stat(path.join(imageDir, file)).then(
        () => true,
        () => false,
      );
      n += 1
    ) {
      file = `${base}-${n}${ext}`;
    }
    await fs.writeFile(path.join(imageDir, file), bytes, { flag: 'wx' });
    return { file, url: imageUrl(file) };
  }

  return {
    name: 'milesima-admin-api',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split('?')[0] ?? '';
        if (!url.startsWith(BASE)) return next();
        try {
          guard(req);
          const route = `${req.method} ${url.slice(BASE.length)}`;
          if (route === 'GET data') return send(res, 200, await getData());
          if (route === 'PUT data')
            return send(res, 200, await putData(await readJson(req)));
          if (route === 'POST images')
            return send(res, 201, await postImage(await readJson(req)));
          throw new HttpError(404, 'Unknown admin route.');
        } catch (error) {
          if (error instanceof HttpError)
            return send(res, error.status, {
              error: error.message,
              details: error.details ?? [],
            });
          server.config.logger.error(
            `[admin] ${(error as Error).stack ?? error}`,
          );
          return send(res, 500, {
            error: 'The admin API failed. See the dev server log.',
          });
        }
      });
    },
  };
}
