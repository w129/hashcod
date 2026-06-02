# Hashcod DocuSeal Tool

Hashcod DocuSeal Tool is a separated PDF signing adapter for the Hashcod platform.
It lets a user preview a PDF locally, place a typed or image signature, and
download a new signed PDF without uploading the document to the Hashcod server.

This package is intentionally separate from the private Hashcod core.

## DocuSeal attribution

This project is based on DocuSeal, licensed under the GNU Affero General Public
License v3.0 with its Section 7(b) additional term. Original project:
[DocuSeal](https://github.com/docusealco/docuseal).

The original DocuSeal attribution must remain visible in interactive user
interfaces. The complete upstream source archive supplied for this integration
is preserved in `upstream/docuseal-master.zip`.

## Hashcod changes

- Added a local PDF preview and signature placement adapter.
- Added typed and image-signature modes.
- Added local PDF export with signer, timestamp, and source digest metadata.
- Added a visible AGPL/source disclosure panel.
- Kept Hashcod private services outside this package.

## Run the standalone demo

Serve this directory with any static HTTP server and open
`app/hashcod-docuseal-adapter.html`.

The Hashcod platform consumes the same browser-side workflow from its own
toolbar. No document is uploaded by this adapter.

## Legal scope

This adapter creates a visible electronic signature mark in a PDF. It does not
claim to be a qualified electronic signature, a notarial service, or a legal
replacement for identity verification. Deployments that require stronger legal
assurance must add verified identities, consent evidence, audit retention, and
applicable jurisdiction-specific controls.
