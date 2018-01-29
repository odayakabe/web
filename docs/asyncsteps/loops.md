---
path: /docs/asyncsteps/loops/
---

# AsyncSteps loops

Loop is a fundamental programming concept. However, it requires special
approach to mimic that on async callbacks with proper memory management.

Luckily, FutoIn AsyncSteps provide a set of loop types with proper `break`
and `continue` commands.

## Generic infinite loop: `for (;;) {}`

Such loop is usually used in persistent service "threads" or when limit
of async requests is not known in advance.


```javascript
asi.loop( (asi) => {
    if (some_condition) {
        asi.break(); // throws special exception
    }
    
    // do something
    
    if (some_other_cond) {
        as.continue(); // throws special exception
    }
    
    // do something more
} );

```

## Repeat loop: `for (i = 0; i < N; ++i) {}`

Such loop is used when maximum number of iterations is known in advance.

```javascript
asi.repeat( 3, (asi, i) => {
    console.log( i ); // 0, 1, 2
    // executed 3 times (max)
} );

```

## For-each loop: `for ( [k, v] of array_or_object_items) {}`

Such loop is very handy to iterate over array or object.

```javascript
const obj = { a: 1, b: 2, c: 3 };

asi.forEach( obj, (asi, k, v) => {
    console.log( `${k}=${v}` );
    // a=1, b=2, c=3
} );

const arr = [ 1, 2, 3 ];

asi.forEach( arr, (asi, k, v) => {
    console.log( `${k}=${v}` );
    // 0=1, 1=2, 2=3
} );

```

## Inner loops and labels

There is a known inner loop break/continue problem. It is safely
solved by labels. So, each AsyncSteps loop function supports optional
string label. The labels can be used in `asi.break()` and `asi.continue()`.

```javascript
asi.loop( (asi) => {
    // outer loop body
    
    asi.repeat( 10, (asi, i) => {
        // middle loop body
        
        asi.forEach( [1, 2, 3], (asi, k, v) => {
            /// inner loop body

            if ( i > 5 ) {
                as.break( 'OUTER' );
                // exit all three loops
            } else {
                as.continue( 'MIDDLE' );
                // continue in the middle loop
            }
        }, 'INNER' );
        
    }, 'MIDDLE' );
    
}, 'OUTER' );

```
