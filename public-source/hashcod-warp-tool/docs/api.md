# Browser adapter API

The adapter exposes `window.HashcodWarpWorkspace`:

- `defaultWorkspace()`
- `normalizeWorkspace(value)`
- `loadWorkspace(storage)`
- `saveWorkspace(storage, workspace)`
- `formatSource(source)`
- `sandboxDocument(source)`
- `languageFromName(filename)`
- `sourceMetrics(source)`
- `compilePlan(file, files)`
- `downloadBlob(filename, content, mime)`

The sandbox document uses a restrictive CSP and reports console output through
`postMessage` events with type `hashcod-warp-log`.

`compilePlan` returns the selected language, recommended command, SHA-256
digest, source metrics, import hints, and a cryptographic-context verdict. This
lets Hashcod present a Warp-style terminal workflow without exposing the host
machine to arbitrary command execution.
