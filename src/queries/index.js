// queries.js
import gql from 'graphql-tag'

export const GET_EVENTS_BY_TYPE = gql`
  query GetEventsByType($type: String) {
    event(where: { productTypeByproductTypeId: { name: { _eq: $type } } }) {
      id
      name
      productTypeByproductTypeId {
        name
      }
    }
  }
`
export const GET_ONE_EVENT = gql`
  query GetOneEvent($event_id: uuid!) {
    event_by_pk(id: $event_id) {
      id
      name
      eventVendors {
        vendor {
          id
          name
          products {
            name
          }
        }
      }
    }
  }
`

export const GET_EVENTS = gql`
  query GetEvents {
    event {
      id
      name
      eventVendors {
        vendor {
          id
          name
        }
      }
    }
  }
`

export const ADD_VENDOR_TO_EVENT = gql`
  mutation AddVendorToEvent($vendor_id: uuid, $event_id: uuid) {
    insert_event_vendor(
      objects: [{ event_id: $event_id, vendor_id: $vendor_id }]
    ) {
      returning {
        vendor {
          id
          name
        }
      }
    }
  }
`

export const REMOVE_VENDOR_FROM_EVENT = gql`
  mutation RemoveVendorFromEvent($vendor_id: uuid, $event_id: uuid) {
    delete_event_vendor(
      where: { event_id: { _eq: $event_id }, vendor_id: { _eq: $vendor_id } }
    ) {
      returning {
        id
      }
    }
  }
`

export const GET_VENDORS = gql`
  query GetVendors {
    vendor {
      id
      name
    }
  }
`

export const LIST_PRODUCTS = gql`
  query ListProducts($vendor_id: uuid) {
    product(where: { vendor_id: { _eq: $vendor_id } }) {
      id
      name
      productType {
        name
      }
    }
  }
`

export const INSERT_PRODUCT = gql`
  mutation AddProduct($name: String, $vendor_id: uuid) {
    insert_product(objects: [{ name: $name, vendor_id: $vendor_id }]) {
      returning {
        id
        name
        productType {
          id
        }
      }
    }
  }
`

// export const DELETE_PRODUCT = gql`
//   mutation DeleteProduct($id: uuid) {
//     delete_product(where: { id: { _eq: $id } }) {
//       returning {
//         id
//       }
//     }
//   }
// `


export const GET_ONE_PRODUCT = gql`
query GetOneProduct($product_id: uuid!) {
  product_by_pk(id: $product_id){
    id
    name
    productType{
      id
      name
    }
    reviewsByproductId{
      userByuserId{
        id
        name
      }
    }
    vendor{
      id
      name
    }
  }
}
`