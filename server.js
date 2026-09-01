const http = require('http');
const httpProxy = require('http-proxy');
const url = require('url');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const proxy = httpProxy.createProxyServer({});

// simple static file server for your html & assets
function serveStatic(req, res, filePath) {
  const ext = path.extname(filePath);
  const types = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
  };
  const contentType = types[ext] || 'application/octet-stream';
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('404 Not Found');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url);
  const pathname = parsed.pathname;

  // proxy route
  const match = pathname.match(/^\/proxy\/(https?:\/\/[^\/]+)(\/.*)?$/);
  if (match) {
    const target = match[1];
    const proxyPath = match[2] || '/';
    req.url = proxyPath;
    proxy.web(req, res, { target, changeOrigin: true });
    return;
  }

  // serve static files from current directory
  // if root, serve index.html; else serve the file
  let filePath = pathname === '/' ? '/index.html' : pathname;
  serveStatic(req, res, path.join(__dirname, filePath));
});

server.listen(PORT, () => {
  console.log(`listening on ${PORT} — proxy and static files`);
});