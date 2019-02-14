import React, { useState } from 'react'
import { Query, Mutation } from 'react-apollo'

import Layout from '../components/layout'
import {
  GET_ONE_EVENT,
  GET_EVENTS,
  GET_VENDORS,
  ADD_VENDOR_TO_EVENT,
  REMOVE_VENDOR_FROM_EVENT,
} from '../queries'

const VendorList = ({ event_id }) => (
  <Query query={GET_ONE_EVENT} variables={{ event_id }}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...'
      if (error) return `Error: ${error.message}`
      const { eventVendors } = data.event_by_pk
      return (
        <div>
          <h2>Vendors</h2>
          {eventVendors.map(({ vendor }) => (
            <div key={vendor.id}>
              <RemoveVendorButton vendor_id={vendor.id} event_id={event_id} />
              {vendor.name}
            </div>
          ))}
        </div>
      )
    }}
  </Query>
)

const EventList = ({ selectedEvent, setSelectedEvent }) => {
  const handleChange = e => {
    setSelectedEvent(e.target.value)
  }
  return (
    <Query query={GET_EVENTS}>
      {({ loading, error, data }) => {
        if (loading) return 'Loading...'
        if (error) return `Error: ${error.message}`
        return (
          <div>
            <div>Select event</div>
            <select
              value={selectedEvent}
              onChange={handleChange}
              className="border"
            >
              {data.event.map(({ name, id }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
            {selectedEvent && <VendorList event_id={selectedEvent} />}
          </div>
        )
      }}
    </Query>
  )
}

const AddVendorButton = ({ event_id, vendor_id }) => (
  <Mutation
    mutation={ADD_VENDOR_TO_EVENT}
    update={(cache, { data: { insert_event_vendor } }) => {
      const { event_by_pk } = cache.readQuery({
        query: GET_ONE_EVENT,
        variables: { event_id },
      })
      cache.writeQuery({
        query: GET_ONE_EVENT,
        variables: { event_id },
        data: {
          event_by_pk: {
            ...event_by_pk,
            eventVendors: event_by_pk.eventVendors.concat(
              insert_event_vendor.returning
            ),
          },
        },
      })
    }}
  >
    {(insert_event_vendor, { data }) => {
      return (
        <button
          onClick={() =>
            insert_event_vendor({ variables: { event_id, vendor_id } })
          }
        >
          Add
        </button>
      )
    }}
  </Mutation>
)

const RemoveVendorButton = ({ event_id, vendor_id }) => (
  <Mutation
    mutation={REMOVE_VENDOR_FROM_EVENT}
    update={(cache, { data: { insert_event_vendor } }) => {
      const { event_by_pk } = cache.readQuery({
        query: GET_ONE_EVENT,
        variables: { event_id },
      })

      cache.writeQuery({
        query: GET_ONE_EVENT,
        variables: { event_id },
        data: {
          event_by_pk: {
            ...event_by_pk,
            eventVendors: event_by_pk.eventVendors.filter(
              ({ vendor }) => vendor.id !== vendor_id
            ),
          },
        },
      })
    }}
  >
    {(delete_event_vendor, { data }) => {
      return (
        <button
          onClick={() =>
            delete_event_vendor({ variables: { event_id, vendor_id } })
          }
        >
          Del
        </button>
      )
    }}
  </Mutation>
)

const VendorSelect = ({ selectedEvent }) => {
  const [selectedVendor, setSelectedVendor] = useState('')
  const handleChange = e => {
    setSelectedVendor(e.target.value)
  }
  return (
    <Query query={GET_VENDORS}>
      {({ loading, error, data }) => {
        if (loading) return 'Loading...'
        if (error) return `Error: ${error.message}`
        !selectedVendor && setSelectedVendor(data.vendor[0].id)
        return (
          <div>
            <div>Add vendor to event</div>
            <select
              value={selectedVendor}
              onChange={handleChange}
              className="border"
            >
              {data.vendor.map(({ name, id }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
            <AddVendorButton
              vendor_id={selectedVendor}
              event_id={selectedEvent}
            />
          </div>
        )
      }}
    </Query>
  )
}

const Page = () => {
  const [selectedEvent, setSelectedEvent] = useState('')
  return (
    <div>
      <EventList
        selectedEvent={selectedEvent}
        setSelectedEvent={setSelectedEvent}
      />
      {selectedEvent && <VendorSelect selectedEvent={selectedEvent} />}
    </div>
  )
}

export default Page
