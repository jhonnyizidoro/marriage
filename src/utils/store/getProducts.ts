import makeRequest from '@/utils/store/makeRequest'

const query = `
  query ($limit: Int) {
    products(first: $limit) {
      edges {
        node {
          id
          title
           onlineStoreUrl
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`

type QueryResult = {
  products: {
    edges: {
      node: {
        id: string
        title: string
        onlineStoreUrl: string
        images: {
          edges: {
            node: {
              url: string
              altText: string | null
            }
          }[]
        }
        variants: {
          edges: {
            node: {
              price: {
                amount: string
                currencyCode: 'BRL'
              }
            }
          }[]
        }
      }
    }[]
  }
}

const getProducts = async ({ limit }: { limit: number }) => {
  const data = await makeRequest<QueryResult>({
    query,
    variables: { limit },
  })

  return data?.products.edges.map((p) => ({
    id: p.node.id,
    title: p.node.title,
    url: p.node.onlineStoreUrl,
    image: p.node.images.edges[0]?.node.url,
    price: p.node.variants.edges[0]?.node.price.amount,
  }))
}

export default getProducts
