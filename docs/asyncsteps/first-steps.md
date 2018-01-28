---
path: /docs/asyncsteps/first-steps/
---

    
## Examples

### "thread" control

```javascript
    const root_as = $as() // create "thread"
        .add( (as) => { /* first step */ } )
        .add( (as) => { /* second step */ } )
        .execute(); // start execution of the thread

    root_as.cancel(); // stop execution & cleanup
```

### try-catch

```javascript
    as.add(
        (as) => {
            // overall "try"
            
            as.add(
                ( as ) => {
                    // inner "try" #1
                    as.error( 'MyError' );
                },
                ( as, err ) => {
                    // inner "catch" #2
                    
                    if ( err === 'MyError' ) {
                        as.success(); // ignore error
                    }
                }
            );
            
            as.add(
                ( as ) => {
                    // inner "try" #2
                    as.error( 'OtherError' );
                },
                ( as, err ) => {
                    // inner "catch" #2
                    
                    if ( err === 'OtherError' ) {
                        as.add( ( as ) => {
                            // some recovery steps
                        } );
                        // implicit success()
                    }
                }
            );
        },
        (as, err) => {
            // overall "catch"
            
            // error code & arbitrary info
            console.log( err, as.state.error_info );
            
            // convention for last native exception ref
            console.log( as.state.last_exception );
        }
    );
```

### Result passing & thread local storage

```javascript
    as.add(
        ( as ) => {
            some_insert( as, {  t: '11' } );
        },
        ( as, err ) => {
            if ( err === 'Duplicate' ) {
                as.success(); // ignore error
            }
        }
    );
    
    // External functionality may insert
    // any number of sub-steps.
    //
    // The last of inserted steps is assumed to
    // call `as.success( { id: selected_id } )` by
    // semantics of particular API.
    some_select( as, {  t: '11' } );
    
    // next steps receives result of the previous
    as.add( ( as, { id } ) => {
        // use "thread local storage"
        as.state.id = id;
    } );
    
    as.add( ( as ) => {
        // access TLS at any time during thread execution
        const { id } = as.state;
    } );
```

