const Product = ({ match }) => (
  <Query
    query={GET_ONE_PRODUCT}
    variables={{ product_id: match.params.productID }}
  >
    {({ loading, error, data }) => {
      if (loading) return 'Loading...'
      if (error) return `Error: ${error.message}`
      const { name } = data.product_by_pk
      return (
        <div>
          <h1>{name}</h1>
          <Link to={`${match.url}/newnote`}>
            <button>New note</button>
          </Link>
          <Route path={`${match.url}/newnote`} component={Note} />
        </div>
      )
    }}
  </Query>
)

const Products = ({ match }) => (
  <div>
    <Route path={`${match.url}/:productID`} component={Product} />
    <Route exact path={match.url} component={AllEvents} />
  </div>
)
