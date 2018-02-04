---
path: /docs/ifaces/types/
---

# Types intro

All types, except for `data` are directly mappable to JSON.

## Standard types

The following types can be used for parameter and result variable definition:

* `boolean` - `true` or `false`.
* `integer` - signed integer with 32-bit precision.
* `number` - float value with 32-bit precision.
* `string` - string of unlimited length (max payload limit is applied).
* `map` - key-value pairs:
    - a JSON object by fact,
    - no order is guaranteed,
    - key - string,
    - value - any type.
* `array` - ordered list of values:
    - value - any type.
* `enum` - value from predefined set:
    - value - integer or string.
* `set` - list of unique values:
    - value - integer or string.
* `data` - binary data:
    - requires binary-friendly message codec (`BinaryData` constraint),
    - value - sequence of bytes.
* `any` - field type is not checked.
* *CustomType* - see below.

## Custom types

Custom types a defined in `types` field  of interfaces spacs. They are named
in `CamelCase` starting with upper case letter.

Custom types can be defined in the spec, inherited or imported from other specs.

All custom types are derived from base type of another custom type. The following
optional constraints can be added depending on the root base type:

* `integer` and `number`:
    - `min` - minimal allowed value (inclusive).
    - `max` - maximal allowed value (inclusive).
* `string`:
    - `regex` - ECMAScript regular expression (as string).
    - `minlen` - minimal string length (inclusive).
    - `maxlen` - maximal string length (inclusive).
* `array`:
    - `minlen` - minimal array length (inclusive).
    - `maxlen` - maximal array length (inclusive).
    - `elemtype` - required element type.
* `map`:
    - `fields` - a map of field_name to:
        - `type` - required field type
        - `optional` - optional. boolean. True, if the field can be omitted.
        - `desc` - optional. string, Description of the field.
    - `elemtype` - required element type, if no "fields" are provided.
* `enum`:
    - `items` - list of allowed integer or string values.
* `set`:
    - `items` - complete set of allowed integer or string values.
* `data`:
    - `minlen` - minimal data array byte length (inclusive).
    - `maxlen` - maximal data array byte length (inclusive).

## Custom type definition

The type can be defined as:

* string - creates an alias.
* array of strings - creates a variation based on other types.
* object - canonical approach with the following fields:
    - `type` - name of base type,
    - constraints - any of the applicable constraints from the previous section.

### Examples:

```javascript
{
    "types" : {
    
        "MyInteger" : "integer",
        // OK: (-2^31) ... -2, -1, 0, 1, 2, ..., (2^31-1)
        
        "MyType" : [ "MyInteger", "string" ],
        // OK: 1, -100, "Some value", "#$%^&", etc.
        
        "Grade" : {
            "type" : "integer",
            "min" : 1,
            "max" : 10
        },
        // OK: 1, 2, ..., 9, 10 
        
        "Name" : {
            "type" : "string",
            "minlen" : 1,
            "maxlen" : 100,
            "regex" : "^[a-z]{1,50}:[a-z]{1,50}$"
        },
        // OK: "a:b", "abczz:a", etc.
        
        "NameList" : {
            "type" : "array"
            "minlen" : 1,
            "maxlen" : 100,
            "elemtype" : "Name"
        },
        // OK: [ "a:a", "bb:aa" ], etc.
        
        "MyObject" : {
            "type" : "map",
            "fields" : {
                "name" : "Name",
                "grade" : {
                    "type" : "Grade",
                    "optional" : true
                }
            }
        },
        // OK: { "name" : "a:a" }, { "name" : "a:a", "grade" : 1 }, etc.
        
        "MyObjectType" : {
            "type" : "enum",
            "items" : [
                "Horizontal",
                "Vertical",
                1,
                3
            ]
        },
        // OK: "Horizontal", 1, etc.
        
        "MyObjectFeatures" : {
            "type" : "set",
            "items" : [
                "Standalone",
                "Hot",
                "Transparent",
                100500
            ]
        }
        // OK: [ "Standalone" ], [ "Standalone", 100500 ], etc.
    }
}
```

## Common custom types

To avoid duplicating commonly used custom types, FutoIn provides a
special mixin iface `futoin.types:{ver}`.

Details are available in [FTN3.1 Common Types](https://specs.futoin.org/final/preview/ftn3.1_if_common_types.html).

## Namespaces

At the moment, FutoIn does not support type namespaces.



