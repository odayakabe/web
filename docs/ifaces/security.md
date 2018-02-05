---
path: /docs/ifaces/security/
---

# Basic Interface Security

There are the following aspects on interface security level:

* `SecureChannel` constraint - TLS-encrypted channel, in-process or
    specially marked as "secure channel" (e.g. over VPN).
* `MessageSignature` constraint - requires for Message Authentication Code
    to ensure message integrity and to authentication Invoker.
* Plain login & password authentication in `sec` field - not recommended.
* HMAC-based authentication in `sec field:
    - HMAC base is generated in logical structure and does not depend on
        coding format representation.
* Advanced security concept as separate large FTN8 specification:
    - Authentication & Authorization concept,
    - Global user identity,
    - Single Sign On (SSO),
    - Online SSO session tracking,
    - Dynamic Server-to-Service secret keys,
    - Separate secure domains and on-behalf-of call support.
* `slvl` - mininal security level required for function calls.

## User identity

It's expected that there is a short local user ID and long unique global user ID.

