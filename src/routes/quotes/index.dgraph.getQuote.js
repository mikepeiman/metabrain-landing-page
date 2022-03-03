import { client } from '$lib/dgraph-client'
console.log(`🚀 ~ file: index.dgraph.getQuote.json.js ~ line 2 ~ client `, client)
import { gql, request } from 'graphql-request'

console.log(`calling index.dgraph.getQuote.json.js`)
const getAllQuotes = gql`query MyQuery {
  queryQuote {
    id
    quoteBody
    author {
      name
    }
    tags {
      name
    }
  }
  }
`



export const get = async ({ url }) => {
console.log(`🚀 ~ file: index.dgraph.getQuote.js ~ line 23 ~ get ~ url`, url)
  try {
    let id = url.searchParams.get("data")
        let data = JSON.parse(id)
    console.log(`🚀 ~ file: index.dgraph.getQuote.js ~ line 26 ~ get ~ id`, id)
    const getQuoteById = gql`query MyQuery {
      queryQuote(filter: {id: "${data}"}) {
        quoteBody
    }}`
    // let data = JSON.parse(id)
    const graphQuery = getQuoteById
    console.log(`🚀 ~ file: index.dgraph.getQuote.js ~ line 35 ~ get ~ graphQuery`, graphQuery)
    await client.request(graphQuery).then((res) => {
      console.log(`🚀 ~ file: index.json.js ~ line 138 ~ awaitclient.request ~ res`, res)
       data = res.queryQuote
    })
    return {
      status: 200,
      body: { data }
    }
  } catch (error) {
    console.log(`🚀 ~ file: index.json.js ~ line 123 ~ get ~ error`, error)
    return {
      body: { error: 'There was a server error' }
    }
  }
}