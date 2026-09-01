try {
  importScripts('/uv.bundle.js');
  importScripts('/uv.config.js');
  importScripts('/uv.handler.js');

  const uv = new Ultraviolet({
    bare: self.__uv$config.bare,
    prefix: self.__uv$config.prefix,
    handler: '/uv.handler.js',
    bundle: '/uv.bundle.js',
    config: '/uv.config.js',
    sw: '/sw.js',
  });

  self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);
    if (url.pathname.startsWith(self.__uv$config.prefix)) {
      event.respondWith(uv.fetch(event));
    }
  });
} catch (err) {
  console.error('SW init failed:', err);
}