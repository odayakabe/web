---
path: /docs/asyncsteps/limiter/
---

# AsyncSteps Limiter

*Please ensure you have read and understood [AsyncSteps Synchronization](/docs/asyncsteps/sync/) first.*

AsyncSteps `Limiter` is a merge of `Mutex` and `Throttle` primitives.

As a live example, `Limiter` is used in FutoIn Invoker and Executor parts
to limit number of simultaneous connections and requests done per second on
both peers. Goals:

* basic DoS protection on Executor:
    - limit resource damage a single badly coded client can do,
    - fair distribution of computing resources among clients.
* throttle requests on Invoker side:
    - avoids triggering limit errors and consuming network resources,
    - helps client side to be a nice citizen.

# Usage

```javascript
/* global */
// Must be imported individually
const Limiter = require( 'futoin-asyncsteps/Limiter' );

const default_lim = new Limiter( {
    /* these are default values */
    concurrent : 1,     // Mutex.max
    max_queue : 0,      // Mutex.max_queue
    rate : 1,           // Throttle.max
    period_ms : 1e3,    // Throttle.period_ms
    burst : 0,          // Throttle.max_queue
} );

asi.sync( default_lim, (asi) => {
    /* critical section */
} );
```

## Additional notes

Please keep in mind you should very carefully tune limits to avoid
failures under load when queue sizes are limited.

Please avoid disabling queue limits as it may lead to out-of-memory DoS.

