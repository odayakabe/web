import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { RMWCProvider } from 'rmwc/Provider'

import Navigation from '../components/Navigation'


import 'normalize.css/normalize.css'
import 'prismjs/themes/prism.css';
import './index.scss'

import GatsbyConfig from '../../gatsby-config'


const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet
      title={GatsbyConfig.siteMetadata.title}
      meta={[
        { name: 'description', content: 'FutoIn project website' },
        { name: 'keywords', content: 'futoin, async, ci, ci, cid, asyncsteps, node.js, api, interfaces, security' },
      ]}>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
    </Helmet>
    <RMWCProvider>
        <Navigation>
            {children()}
        </Navigation>
    </RMWCProvider>
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
