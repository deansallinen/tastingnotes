import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider, Query } from 'react-apollo'

import Vendor from './pages/vendor'
import Organizer from './pages/organizer'
import Layout from './components/layout'

import { GET_EVENTS_BY_TYPE } from './queries'

const client = new ApolloClient({
  uri: 'https://ds-tasting-notes.herokuapp.com/v1alpha1/graphql',
})

const EventCard = event => (
  <div className="px-2" key={event.id}>
    <div className="p-4 bg-white shadow rounded">
      <div>{event.name}</div>
    </div>
  </div>
)

const AllEvents = ({ match }) => {
  const { type } = match.params
  return (
    <Query query={GET_EVENTS_BY_TYPE} variables={{ type }}>
      {({ loading, error, data }) => {
        // if (loading) return 'Loading...'
        // if (error) return `Error: ${error.message}`

        return (
          <Layout >
            <h1 className="mb-4 text-base uppercase text-grey-darker">
              {type} Events
            </h1>
            <div className="flex flex-wrap -mx-2">
              {loading && 'loading...'}
              {error && `Error: ${error.message}`}
              {data.event &&
                data.event.map(event => (
                  <Link to={`${match.url}/${event.id}`}>
                    <EventCard key={event.id} {...event} />
                  </Link>
                ))}
            </div>
          </Layout>
        )
      }}
    </Query>
  )
}

class App extends Component {
  render() {
    return (
      <Router>
        <ApolloProvider client={client}>
          <Switch>
            <Route exact path="/" component={AllEvents} />
            <Route path="/vendor" component={Vendor} />
            <Route path="/organizer" component={Organizer} />
            <Route path="/:type" component={AllEvents} />
          </Switch>
        </ApolloProvider>
      </Router>
    )
  }
}

export default App
