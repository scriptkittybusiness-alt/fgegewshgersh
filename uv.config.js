self.__uv$config = {
  prefix: '/service/',
  bare: 'https://fgegewshgersh-production.up.railway.app/bare/',
  encodeUrl: Ultraviolet.codec.xor.encode,
  decodeUrl: Ultraviolet.codec.xor.decode,
  handler: '/uv.handler.js',
  bundle: '/uv.bundle.js',
  config: '/uv.config.js',
  sw: '/sw.js',
};