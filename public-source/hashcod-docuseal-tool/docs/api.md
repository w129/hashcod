# API bridge

The included Hashcod signing adapter runs locally in the browser and does not
require a server API. A production DocuSeal integration should use a separate,
authenticated API bridge with:

- HTTPS only
- scoped service tokens
- request size limits
- signed webhooks
- audit events without document contents
- document retention policies

Do not expose Hashcod private keys or database credentials to the DocuSeal
service.
