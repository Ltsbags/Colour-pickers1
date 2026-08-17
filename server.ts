import { createServer } from 'node:http';
import { parse, fileURLToPath } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
import next from 'next';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectDir = __dirname;

const isProduction = process.env.NODE_ENV === 'production';
const hasBuildManifest = fs.existsSync(path.join(projectDir, '.next', 'routes-manifest.json'));
const dev = !isProduction || !hasBuildManifest;
const hostname = '0.0.0.0';
const port = 3000;

const app = next({ dev, hostname, port, dir: projectDir });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url || '/', true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  });

  server.listen(port, hostname, () => {
    console.log(`> Next.js server listening on http://${hostname}:${port} (dev=${dev})`);
  });
});

