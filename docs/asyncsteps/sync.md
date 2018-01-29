---
path: /docs/asyncsteps/sync/
---

# AsyncSteps Synchronization

Even when no hardware race condition occurs, there is always possibility
of semantic race conditions.

Examples:

* only one heavy active computation should run for cacheable value generation,
* limit number of concurrent connections to database or peer,
* limit number of requests per period.

## Generic synchronization idiom

Synchronization of AsyncSteps "thread" is done through `asi.sync( isync_obj, step[, error_handler] )`
against arbitrary synchronization primitive.

```javascript
const isync_obj = /* some construct */;

asi.add( (asi) => {
    asi.add( (asi) => as.success( 'some_arg' ) );
    
    // Like a regular step, but synchronized
    asi.sync(
        isync_obj,
        (asi, arg) => {
            /* critical section */
            
            assert( arg === 'some_arg' );
            
            as.success( 'other_arg' );
        },
        (asi, error_code) => {
            /* error handler */
        }
    );
    
    as.add( (asi, arg) => assert( arg === 'other_arg' ) );
} );
```

## Synchronization primitive

Any object implementing `ISync` interfaces can be used for synchronization.

However, implementation must properly pass in and out arguments and correctly
cleanup state on stack unwinding in cancel and error cases.

Implementation of the primitive should be re-entrant - the same thread must be able to
synchronize against the same primitive multiple times in the same async stack.

All synchronization primitives defined in the FTN12 spec are re-entrant.

The primitive may also limit number of queued "threads".


## Mutex

This synchronization primitive ensures that no more than preconfigured MAX
number of AsyncSteps "threads" enter protected critical section simultaneously.

Additionally, it may limit number of queued AsyncSteps "threads".

```javascript
/* global */
// Must be imported individually
const Mutex = require( 'futoin-asyncsteps/Mutex' );

// max = 1, infinite queue
const one_max_mtx = new Mutex();

 // max = 3, max_queue = 10
const three_with_ten_queued_max_mtx = new Mutex( 3, 10 );

/* ... */

asi.sync( one_flow_mtx, (asi) => {
    /* critical section */

    asi.sync( one_flow_mtx, (asi) => {
        // re-entrant
    } );
} );
```

## Throttle

This synchronization primitive ensures that no more than MAX number of
AsyncSteps "threads" enter critical section per PERIOD.

Additionally, it may limit number of queued AsyncSteps "threads". That's
strongly encouraged for throttling purposes.


```javascript
/* global */
// Must be imported individually
const Throttle = require( 'futoin-asyncsteps/Throttle' );

// max = 8, period_ms = 1e3, infinite queue
const eight_per_second = new Throttle( 8 );

// max = 3, period_ms = 10e3, max_queue = 7
const three_per_ten_seconds_with_seven_in_queue = new Throttle( 3, 10e3, 7 );

/* ... */

asi.sync( eight_per_second, (asi) => {
    /* critical section */
} );
```


