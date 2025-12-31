import fs from 'fs';
import path from 'path';
import type { IncomingMessage, ServerResponse } from 'http';

/**
 * Serves pagefind files from dist in dev mode.
 * Run `npm run build` once to generate the index, then dev server has search.
 */
export function pagefindDev() {
  const pagefindDir = path.resolve(process.cwd(), '.vitepress/dist/pagefind');

  return {
    name: 'pagefind-dev',
    apply: 'serve',
    configureServer(server: any) {
      server.middlewares.use((req: IncomingMessage, res: ServerResponse, next: () => void) => {
        // Strip query string from URL
        const url = req.url?.split('?')[0];

        if (url?.startsWith('/pagefind/')) {
          const relativePath = url.replace('/pagefind/', '');
          const filePath = path.join(pagefindDir, relativePath);

          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            const ext = path.extname(filePath);
            const mimeTypes: Record<string, string> = {
              '.js': 'application/javascript',
              '.css': 'text/css',
              '.json': 'application/json',
              '.pf_meta': 'application/octet-stream',
              '.pf_fragment': 'application/octet-stream',
              '.pf_index': 'application/octet-stream',
              '.pagefind': 'application/octet-stream',
            };

            res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
            fs.createReadStream(filePath).pipe(res);
            return;
          }
        }
        next();
      });
    }
  };
}
