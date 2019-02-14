import React, { useState } from 'react'
import { Query, Mutation } from 'react-apollo'

import Layout from '../components/layout'
import { LIST_PRODUCTS, INSERT_PRODUCT, GET_VENDORS } from '../queries'

const ListProduct = ({ vendor_id }) => {
  return (
    <Query query={LIST_PRODUCTS} variables={{ vendor_id }}>
      {({ loading, error, data }) => {
        if (!vendor_id) return null
        if (loading) return 'Loading...'
        if (error) return `Error: ${error.message}`
        return (
          <div>
            {data.product.map(({ name, id }) => (
              <div key={id}>
                {/* <DeleteProduct id={id} vendor_id={vendor_id} /> */}
                {name}
              </div>
            ))}
          </div>
        )
      }}
    </Query>
  )
}

// const DeleteProduct = ({ id, vendor_id }) => (
//   <Mutation
//     mutation={DELETE_PRODUCT}
//     update={(cache, { data: { delete_product } }) => {
//       const { product } = cache.readQuery({
//         query: LIST_PRODUCTS,
//         variables: { vendor_id },
//       })
//       cache.writeQuery({
//         query: LIST_PRODUCTS,
//         variables: { vendor_id },
//         data: {
//           product: product.filter(
//             product => product.id !== delete_product.returning.id
//           ),
//         },
//       })
//     }}
//   >
//     {(delete_product, { data }) => (
//       <button
//         onClick={e => {
//           e.preventDefault()
//           delete_product({ variables: id })
//         }}
//       >
//         X
//       </button>
//     )}
//   </Mutation>
// )

const InsertProduct = ({ vendor_id }) => {
  const [productName, setProductName] = useState('')
  return (
    <Mutation
      mutation={INSERT_PRODUCT}
      update={(cache, { data: { insert_product } }) => {
        const { product } = cache.readQuery({
          query: LIST_PRODUCTS,
          variables: { vendor_id },
        })
        cache.writeQuery({
          query: LIST_PRODUCTS,
          variables: { vendor_id },
          data: { product: [...product, ...insert_product.returning] },
        })
      }}
    >
      {(insert_product, { data }) => (
        <form
          onSubmit={e => {
            e.preventDefault()
            insert_product({ variables: { name: productName, vendor_id } })
            setProductName('')
          }}
        >
          <label htmlFor="newProduct">Add new product</label>
          <input
            type="text"
            name="newProduct"
            value={productName}
            onChange={e => setProductName(e.target.value)}
            className="border"
          />
          <button type="submit">Submit</button>
        </form>
      )}
    </Mutation>
  )
}

const Vendor = () => {
  const [selectedVendor, setSelectedVendor] = useState('')
  const handleChange = e => {
    setSelectedVendor(e.target.value)
  }
  return (
    <div>
      <Query query={GET_VENDORS}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...'
          if (error) return `Error: ${error.message}`
          !selectedVendor && setSelectedVendor(data.vendor[0].id)
          return (
            <div>
              <select value={selectedVendor} onChange={handleChange}>
                {data.vendor.map(({ name, id }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          )
        }}
      </Query>
      <h2>Products</h2>
      <ListProduct vendor_id={selectedVendor} />
      <InsertProduct vendor_id={selectedVendor} />
    </div>
  )
}

export default Vendor
