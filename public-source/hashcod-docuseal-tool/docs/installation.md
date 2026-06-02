# Installation

## Hashcod adapter demo

Serve this package with a static HTTP server and open:

`app/hashcod-docuseal-adapter.html`

The browser must load `pdf-lib` before the adapter script.

## Optional upstream DocuSeal service

Run:

```sh
docker compose up
```

This starts the upstream DocuSeal service separately from Hashcod. Keep private
Hashcod keys outside this container and exchange only the minimum required
document status metadata through a reviewed API bridge.
