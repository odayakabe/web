---
path: /docs/ifaces/
---

# Interface Intro

In FutoIn, business process is a **Service**. Each Service has a named versionable
**interface**. Each interface has strict definition of types and functions called **spec**.
**Spec** is a JSON document in special format.

**Invoker** and **Executor** are two types of roles in FutoIn communication. Invoker
makes calls to Executor. Executor hosts Services. Usually, Invoker is also a client
in network communication.

**FutoIn messages** can be represented in **JSON** (default), **MessagePack**, **CBOR**
and potentially other codecs. Embedded binary data is supported only in later two.
Raw binary data is supported through HTTP transport.

FutoIn messages can be transmitted through different **communications channels**:
HTTP, WebSockets, datagram protocols (UNIX, UDP, SCTP, Browser cross-page event), other custom
framing on top of streams.

There is special HTTP integration with human-readable URL coding/mapping of message.

## Security

Security data in transmitted in special `sec` field.

Base security is derived from HTTP Basic Authentication with `{user}:{password}` pair.
Basic Auth can be extracted from `Authorization` HTTP header.

More secure is **HMAC** approach `-hmac:{user}:{type}:{hash}`.

Basic Auth is very weak protection and should be avoided. HMAC adds security, but still
has many flaws with secret key management. Advanced Security concept is a separate FutoIn
specification.

## On-behalf-of calls

FutoIn requests support a special `obf` field to allows calls on behalf of another user
what is typical in cases when one Services makes calls to another Services with authorization
of some particular user. Details are also covered in dedicated spec.

## Service interface features

1. Unique Java-style identifier:
    - e.g. `com.example.project.feature`,
    - reserved namespace `futoin.*` for official specs.
1. Semantic Versioning like `1.0` (see [SemVer][]):
    - only two MAJOR and MINOR parts,
    - backward compatibility.
1. Interface inheritance:
    - allow calls to derived interface through the base one.
1. Imports:
    - mixin types and functions, but do not create
        inheritance chain.
1. Complex custom types:
    - inherited from JSON-compatible base types,
    - `integer` as constrained JSON `number`,
    - raw byte vector `data` for non-JSON,
    - type variants (one-of),
    - min/max value constraints for numeric,
    - min/max length for strings, arrays and raw data,
    - item type for arrays,
    - field definition for maps (objects),
    - enums and sets.
1. Strict function definition:
    - identifier (e.g. `someFunc`),
    - parameter definition in standard and custom types,
    - result definition in standard and custom types,
    - list of expected exceptions,
    - raw input/output indication,
    - max request/response payload size,
    - `heavy` request indication.
1. Interface constraints (requirements):
    - allow anonymous access,
    - require secure channel,
    - require Message Authentication Code,
    - require binary codec,
    - require bi-directional channel,
    - others.

## Communication channel features

* Uni-directional:
    - only one peer can act as Invoker,
    - example: HTTP(S).
* Bi-directional:
    - both can act as Invoker and Executor,
    - example: WebSockets, transport protocols, in-browser cross-page events.
* Message multiplexing:
    - allows using a single communication channel for parallel requests,
    - special counter "rid" field to tie requests to responses.
* Channel-specific features:
    - Raw data upload & download for HTTP,
    - Message coding in friendly URL for HTTP.
* Payload size limits based on interface specs.

## Examples spec

Based on FutoIn Database interface Level 1.

```json
{
  "iface": "futoin.db.l1",
  "version": "1.0",
  "ftn3rev": "1.7",
  "imports": [
    "futoin.ping:1.0"
  ],
  "types": {
    "Query": {
      "type": "string",
      "minlen": 1,
      "maxlen": 10000
    },
    "Identifier": {
      "type": "string",
      "maxlen": 256
    },
    "Row": "array",
    "Rows": {
      "type": "array",
      "elemtype": "Row",
      "maxlen": 1000
    },
    "Field": {
      "type": "string",
      "maxlen": 256
    },
    "Fields": {
      "type": "array",
      "elemtype": "Field",
      "desc": "List of field named in order of related Row"
    },
    "Flavour": {
      "type": "Identifier",
      "desc": "Actual actual database driver type"
    },
    "QueryResult": {
      "type": "map",
      "fields": {
        "rows": "Rows",
        "fields": "Fields",
        "affected": "integer"
      }
    }
  },
  "funcs": {
    "query": {
      "params": {
        "q": "Query"
      },
      "result": "QueryResult",
      "throws": [
        "InvalidQuery",
        "Duplicate",
        "OtherExecError",
        "LimitTooHigh"
      ]
    },
    "callStored": {
      "params": {
        "name": "Identifier",
        "args": "Row"
      },
      "result": "QueryResult",
      "throws": [
        "InvalidQuery",
        "Duplicate",
        "OtherExecError",
        "LimitTooHigh",
        "DeadLock"
      ]
    },
    "getFlavour": {
      "result": "Flavour"
    }
  }
}
```

## Example messages

Canonical formatted JSON examples.

Request:

```json
{
    "f" : "futoin.db.l1:1.0:query",
    "p" : {
        "q" : "SELECT 1"
    },
    "sec" : "-hmac:user:SHA-256:abcd...efgh"
}
```

Response:

```json
{
    "r" : "postgresql",
    "sec" : "-hmac:user:SHA-256:abcd...efgh"
}
```

Error:

```json
{
    "e" : "SecurityError",
    "edesc" : "Invalid user or HMAC"
}
```

## Reference specifications

*Note: "spec" refers both to FutoIn specification and particular interface
specification as those are tightly related.*

* [FTN2 Specification Versioning](https://specs.futoin.org/final/preview/ftn2_spec_versioning.html)
* [FTN3 Interface Definition](https://specs.futoin.org/final/preview/ftn3_iface_definition.html)
* [FTN3.1 Common Types](https://specs.futoin.org/final/preview/ftn3.1_if_common_types.html)
* [FTN5 HTTP integration](https://specs.futoin.org/final/preview/ftn5_iface_http_integration.html)


[SemVer]: https://semver.org/
