# Browser adapter API

The adapter exposes `window.HashcodWarpWorkspace`:

- `defaultWorkspace()`
- `normalizeWorkspace(value)`
- `loadWorkspace(storage)`
- `saveWorkspace(storage, workspace)`
- `formatSource(source)`
- `sandboxDocument(source)`
- `downloadBlob(filename, content, mime)`

The sandbox document uses a restrictive CSP and reports console output through
`postMessage` events with type `hashcod-warp-log`.
