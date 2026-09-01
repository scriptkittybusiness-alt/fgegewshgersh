importScripts = undefined; // not needed here, we use the UV bundle

// Actually place this in sw.js via importScripts. For simplicity:
// Put your ultraviolet bundle (from node_modules) into public/ and import it.
// Or use a CDN bundle. This is the cleanest local path:

// public/uv.bundle.js should be the built ultraviolet client.
// Generate or copy from node_modules/@titaniumnetwork-dev/ultraviolet/dist/uv.bundle.js
// Then reference it in sw.js.