---
path: /docs/ifaces/inherit/
---

# Interface Inheritance

Let's assume:

* There is some standard FutoIn interface which can
    be supported by different clients.
* There are several different vendors for Service-side business logic.
* Some of the vendors may want to extend the standard with custom
    functionality, but still allow standard clients to use their Service.

Such use case is easily solved by inheritance. Any particular vendor
can create own specification inherited from a standard one.

## Requirements

Inherited specification must comply with all requirements of interface
backward compatibility defined in [Interface Functions](/docs/ifaces/funcs/).

It is forbidden to register Services the way which creates a conflict of
implementation selection on the same Executor. The following cases are not allowed:

* One Service implements Base, but another Service - Derived interface.
* One Service implements DerivedA, another DerivedB, but both using Base.

## Call details

Clients may use the base interface in calls, but Executor maps them to actual
derived interface.

## Example:

The base interface:

```json
{
    "iface" : "futoin.some_standard",
    "version" : "1.0",
    "ftn3rev" : "1.9",
    "funcs" : {
        "someFunc" : {
            "params" : {
                "some_arg" : "SomeType"
            },
            "result" : {
                "some_res" : "SomeType"
            }
        }
    }
}
```

The derived custom interface:

```json
{
    "iface" : "com.example.some_standard",
    "version" : "1.0",
    "ftn3rev" : "1.9",
    "inherit" : "futoin.some_standard:1.0"
    "funcs" : {
        "someFunc" : {
            "params" : {
                "some_arg" : "SomeType",
                "custom_arg" : {
                    "type" : "CustomType",
                    "default" : null
                }
            },
            "result" : {
                "some_res" : "SomeType",
                "custom_res" : "CustomType"
            }
        }
    }
}
```




