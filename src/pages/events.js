import React from 'react'
import { Query } from 'react-apollo'
import { Link } from 'gatsby'

import Layout from '../components/layout'

import { GET_EVENTS, GET_ONE_EVENT, GET_ONE_PRODUCT } from '../queries'

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
          <Link to={`${match.url}/newnote`}>
            <button>New note</button>
          </Link>
          <Route path={`${match.url}/newnote`} component={Note} />
        </div>
      )
    }}
  </Query>
)

const AllEvents = ({ match }) => (
  <Query query={GET_EVENTS}>
    {({ loading, error, data }) => {
      // if (loading) return 'Loading...'
      // if (error) return `Error: ${error.message}`

      return (
        <Layout>
          <h1 className="mb-4 text-base uppercase text-grey-darker">Events</h1>
          <div className="flex flex-wrap -mx-2">
            {loading && 'loading...'}
            {error && `Error: ${error.message}`}
            {data.event &&
              data.event.map(event => (
                <div key={event.id}>
                  <Link to="/">
                    <EventCard {...event} />
                  </Link>
                </div>
              ))}
          </div>
        </Layout>
      )
    }}
  </Query>
)

export default AllEvents
