
import React from 'react'
import { Button } from 'rmwc/Button';
import { Helmet } from "react-helmet";
import Link from 'gatsby-link'

import GatsbyConfig from '../../../gatsby-config'
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

export default function Page({pathContext}) {
    const path = pathContext.frontmatter.path;
    let prev, next, curr;
    
    for (let m of flat_menu) {
        if ( path === m.url ) {
            curr = m;
        } else if (curr) {
            next = m;
            break;
        } else {
            prev = m;
        }
    }
    
    return (
        <div>
            <Helmet>
                <title> {curr.full_label} | {GatsbyConfig.siteMetadata.title} </title>
                { prev && <link rel="prev" href={prev.url} /> }
                { next && <link rel="next" href={next.url} /> }
            </Helmet>
            <article dangerouslySetInnerHTML={{__html: pathContext.html}} />
            <div className="nav-buttons"> 
                <div className="nav-prev">
                    {prev &&
                        <Link to={prev.url}>
                            <Button theme="secondary-dark"> Prev: {prev.full_label} </Button>
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
