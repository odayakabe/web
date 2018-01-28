---
path: /docs/asyncsteps/parallel/
---

# Parallel AsyncSteps

Parallel worker pool is created as a special step through `asi.parallel()` call:

* Each worker creates a "sub-thread".
* All workers share the same `state`.
* Not recovered error in any of the workers immediately cancels other workers.
    The error is used to unwind parent async stack.
* It's allowed to create inner parallel steps inside any worker step.
* There is implicit synchronization barrier at the end.


```javascript
asi.add( (asi) => {
    const p = asi.parallel();
    
    p.add( (as) => parallel_A() );
    p.add( (as) => parallel_B() );
    p.add( (as) => parallel_C() );
    
    as.add( (asi) => {
        // all parallel steps must be finished
    } );
} );
```

## Note on parallelization

1. All parallel steps utilize the same CPU - there is no scaling.
2. Such parallelization is designed for external event waiting.

