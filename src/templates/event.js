import React from 'react'
import Link from 'gatsby'

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
