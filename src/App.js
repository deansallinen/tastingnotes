import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider, Query } from 'react-apollo'

import Vendor from './pages/vendor'
import Organizer from './pages/organizer'
import Layout from './components/layout'

import { GET_EVENTS, GET_ONE_EVENT } from './queries'

const client = new ApolloClient({
  uri: 'https://ds-tasting-notes.herokuapp.com/v1alpha1/graphql',
})

const EventCard = event => (
  <div className="px-2" key={event.id}>
    <div className="p-4 bg-white shadow rounded">
      <div>{event.name}</div>
      <ul>
        {event.eventVendors.map(({ vendor }) => (
          <li key={vendor.id}>{vendor.name}</li>
        ))}
      </ul>
    </div>
  </div>
)

const Event = ({ match }) => (
  <Query query={GET_ONE_EVENT} variables={{ event_id: match.params.eventID }}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...'
      if (error) return `Error: ${error.message}`
      const { name, eventVendors } = data.event_by_pk
      return (
        <div>
          <h1>{name}</h1>
          {eventVendors.map(({ vendor }) => (
            <div>
              <h2 key={vendor.id}>{vendor.name}</h2>
              <ul>
                {vendor.products.map(product => (
                  <li>{product.name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )
    }}
  </Query>
)

const Events = ({ match }) => (
  <Layout>
    <Route path={`${match.url}/:eventID`} component={Event} />
    <Route exact path={match.url} component={AllEvents} />
  </Layout>
)

const AllEvents = ({ match }) => (
  <Query query={GET_EVENTS}>
    {({ loading, error, data }) => {
      // if (loading) return 'Loading...'
      // if (error) return `Error: ${error.message}`

      return (
        <div>
          <h1 className="mb-4 text-base uppercase text-grey-darker">Events</h1>
          <div className="flex flex-wrap -mx-2">
            {loading && 'loading...'}
            {error && `Error: ${error.message}`}
            {data.event &&
              data.event.map(event => (
                <div key={event.id}>
                  <Link to={`${match.url}/${event.id}`}>
                    <EventCard {...event} />
                  </Link>
                </div>
              ))}
          </div>
        </div>
      )
    }}
  </Query>
)

const Home = () => <Layout>Home</Layout>

class App extends Component {
  render() {
    return (
      <Router>
        <ApolloProvider client={client}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/events" component={Events} />
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
