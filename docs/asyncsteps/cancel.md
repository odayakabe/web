---
path: /docs/asyncsteps/cancel/
---

# AsyncSteps timeout & cancel

Execution of AsyncSteps "thread" can be canceled only through
`.cancel()` API on _root_ AsyncSteps object.

Such requirement is intentional design as normal abort must
occur through `.error()` with regular stack unwinding.

The difference in stack unwinding is that both cases do call
cancel handlers, but only the later calls error handlers.

```javascript
const root_as = $as().add( (asi) => {/*...*/} ).execute();
setTimeout( () => root_as.cancel(), 1e3 ); // cancel in 1 second
```

## Cancel handlers

Cancel handler are set through `asi.setCancel()` API during step
execution.

Cancel handlers are called BEFORE error handlers and ONLY during
stack unwinding due to cancel or error.

```javascript
asi.add( (asi) => {
    asi.setCancel( (asi) => do_some_cleanup() );
    
    // note that explicit success() or sub-step is required
    setTimeout( () => asi.success(), 1e3 );
} );
```

## Timeouts

Timeouts are set per step and they cover all inner sub-steps.
If timeout is reached then `Timeout` error is thrown.

AsyncSteps timeout is effective control of maximum execution time.

```javascript
asi.add(
    (asi) => {
        asi.setTimeout( 10e3 ); // set 10 second
        asi.setTimeout( 1e3 ); // override with 1 second
        
        // note that explicit success() or sub-step is required
        asi.add( (asi) => {
            asi.setTimeout( 100e3 ); // only applies to sub-step
        } );
    },
    (asi, error_code) => {
        // Note that timeout gets triggered after 1 second, but not 100!
        
        if (error_code === 'Timeout') {
            as.success();
        }
    }
);
```

## Cancel & Timeout side effects

If `setCancel()` or `setTimeout()` is called then it disables implicit `success()`
at end of step.
