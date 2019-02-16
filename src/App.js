import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider, Query } from 'react-apollo'
import gql from 'graphql-tag'

const client = new ApolloClient({
  uri: 'https://ds-tasting-notes.herokuapp.com/v1alpha1/graphql',
})

const one = () => <div>One</div>
const two = () => <div>two</div>
const three = () => <div>three</div>

const GET_EVENTS = gql`
  query GetEvents {
    event(where: { productTypeByproductTypeId: { name: { _eq: "wine" } } }) {
      id
      name
      productTypeByproductTypeId {
        name
      }
      eventAttendees {
        userByuserId {
          name
        }
      }
    }
  }
`

const AllEvents = () => (
  <Query query={GET_EVENTS}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...'
      if (error) return `Error: ${error.message}`

      return (
        <div>
          {data.event &&
            data.event.map(event => (
              <div className="flex items-baseline my-2" key={event.id}>
                <div>{event.name}</div>
              </div>
            ))}
        </div>
      )
    }}
  </Query>
)

class App extends Component {
  render() {
    return (
      <Router>
        <ApolloProvider client={client}>
          <div className="">
            <header className="container py-4 bg-yellow-light">
              <div className="flex justify-between ">
                <div>Logo</div>
                <div>
                  <Link to="/one">
                    <div className="inline-block">One</div>
                  </Link>
                  <Link to="/two">
                    <div className="inline-block">Two</div>
                  </Link>
                  <Link to="/three">
                    <div className="inline-block">Three</div>
                  </Link>
                  <button>Login</button>
                </div>
              </div>
            </header>
            <Route path="/one" component={AllEvents} />
            <Route path="/two" component={two} />
            <Route path="/three" component={three} />
          </div>
        </ApolloProvider>
      </Router>
    )
  }
}

export default App
