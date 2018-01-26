import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { RMWCProvider } from 'rmwc/Provider';

import 'normalize.css/normalize.css'
import './index.css'


const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet
      title="FutoIn"
      meta={[
        { name: 'description', content: 'FutoIn project website' },
        { name: 'keywords', content: 'futoin, async, ci, ci, cid, asyncsteps, node.js, api, interfaces, security' },
      ]}
    />
    <RMWCProvider>
        {children()}
    </RMWCProvider>
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
