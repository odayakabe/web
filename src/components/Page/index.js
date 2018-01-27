
import React from 'react'
import { Button } from 'rmwc/Button';
import Link from 'gatsby-link'

import menuContent from '../../menu.json'

const flat_menu = [];

for (let m of menuContent) {
    if (m.submenu) {
        for ( let sm of m.submenu ) {
            sm = Object.assign(
                {
                    full_label: `${m.label} > ${sm.label}`
                },
                sm
            );
            flat_menu.push( sm );
        }
    } else {
        m = Object.assign(
            {
                full_label: m.label
            },
            m
        );
        flat_menu.push( m );
    }
}

export default function Page({location, pathContext}) {
    const path = location.pathname;
    let prev, next, found = false;
    
    for (let m of flat_menu) {
        if ( path === m.url ) {
            found = true;
        } else if (found) {
            next = m;
            break;
        } else {
            prev = m;
        }
    }
    
    return (
        <div>
            <article dangerouslySetInnerHTML={{__html: pathContext.html}} />
            <div className="nav-buttons"> 
                <div className="nav-prev">
                    {prev &&
                        <Link to={prev.url}>
                            <Button> Prev: {prev.full_label} </Button>
                        </Link>}
                </div>
                <div className="nav-next">
                    {next &&
                        <Link to={next.url}>
                            <Button raised theme="secondary-bg"> Next: {next.full_label} </Button>
                        </Link>}
                </div>
            </div>
        </div>
    );
};
