const http = require('http');
const httpProxy = require('http-proxy');
const url = require('url');

const proxy = httpProxy.createProxyServer({});
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url);
  const match = parsed.pathname.match(/^\/proxy\/(https?:\/\/[^\/]+)(\/.*)?$/);

  if (match) {
    const target = match[1];
    const path = match[2] || '/';
    req.url = path;
    proxy.web(req, res, { target, changeOrigin: true });
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <h2>proxy's alive</h2>
      <p>hit <code>/proxy/https://example.com</code> and it'll pipe whatever</p>
    `);
  }
});

server.listen(PORT, () => console.log(`listening on ${PORT}`));