# Hashcod Warp Workspace

Hashcod Warp Workspace is a separated browser programming adapter for Hashcod.
It provides editable project files, a terminal-like command surface, local
persistence, downloads, and sandboxed JavaScript execution.

## Warp attribution

This adapter is based on ideas and visual attribution from
[Warp](https://github.com/warpdotdev/Warp), published by Denver Technologies,
Inc. Warp's `warpui_core` and `warpui` crates are licensed under MIT. The rest
of the Warp repository is licensed under GNU AGPL v3. Exact copies are included
as `LICENSE-MIT` and `LICENSE-AGPL`.

## Scope

This package contains only the Hashcod browser adapter. It is not the complete
native Warp desktop application. The native Warp source remains available from
the upstream repository and can be fetched reproducibly with
`scripts/fetch-upstream.ps1`.

## Run

Open `app/hashcod-warp-workspace.html` in a modern browser. JavaScript execution
is local and isolated in a sandboxed iframe with network access blocked.

## Commands

`help`, `files`, `cat <file>`, `new <file>`, `rm <file>`, `run`, `save`,
`format`, `download`, `clear`, and `reset`.
