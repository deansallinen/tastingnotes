import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Note from '../components/createNote'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <Note />
  </Layout>
)

export default IndexPage
