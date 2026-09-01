self.__uv$config = {
  prefix: '/service/',
  bare: 'https://YOUR-BARE-SERVER-URL/bare/',
  encodeUrl: Ultraviolet.codec.xor.encode,
  decodeUrl: Ultraviolet.codec.xor.decode,
  handler: '/uv.handler.js',
  bundle: '/uv.bundle.js',
  config: '/uv.config.js',
  sw: '/sw.js',
};