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
  let queryType = JSON.parse(url.searchParams.get("queryType"))
  console.log(`🚀 ~ file: index.dgraph.getQuote.js ~ line 25 ~ get ~ queryType`, queryType)
  let query, id
  if (queryType === "getQuoteById") {
    id = url.searchParams.get("data")
    query = gql`query MyQuery {
      queryQuote(filter: {id: "${id}"}) {
        quoteBody
    }}`
  }
  if (queryType === "getQuoteByAuthor") {
    author = url.searchParams.get("data")
    query = gql`query MyQuery {
      queryQuote(filter: {author: {name: ${authorName}}}) {
        quoteBody
      }}`
  }
  if (queryType === "getAllQuotes") {
    console.log(`🚀 ~ file: index.dgraph.getQuote.js ~ line 42 ~ queryQuote ~ queryType === "getAllQuotes"`, queryType === "getAllQuotes")
    query = gql`query MyQuery {
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
  }

  try {
    await client.request(query).then((res) => {
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