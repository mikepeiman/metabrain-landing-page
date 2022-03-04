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
  let data = JSON.parse(url.searchParams.get("data"))
  let payload
  console.log(`🚀 ~ file: index.dgraph.getQuote.js ~ line 25 ~ get ~ queryType & data: `, queryType, data)
  let query, id, quote
  if (queryType === "getQuoteById") {
    id = data
    query = gql`query MyQuery {
      queryQuote(filter: {id: "${id}"}) {
        quoteBody
    }}`
  }
  if (queryType === "getQuoteByAuthor") {
    author = data
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
      date
      context
      tags {
        name
      }
      source {
        name
      }
    }
  }
`
  }
  if (queryType === "upsertQuote") {
    quote = data
    // quote.date === "" || quote.date === "undefined" || quote.date === undefined ? quote.date = "" : quote.date
    // new Date().toISOString()
    payload = `
    {
      "quote":
      {
        "originalText": "${quote.quoteBody} - ${quote.author.name}, ${quote.author.title} [${quote.source}] @(${quote.tags})",
        "quoteBody": "${quote.quoteBody}",
        "author": {
          "name": "${quote.author.name}",
          "title": "${quote.author.title}"
        },
        "date": "${quote.date}",
        "context": "${quote.context}",
        "tags": [${quote.tags}],
        "source": {
          "name": "${quote.source}"
        }
      }
  }
  `

  // mutation DeleteSources {
  //   deleteSource(filter: {}) {
  //     msg
  //     numUids
  //   }
  // }
  
  // mutation DeleteAllQuotes {
  //   deleteQuote(filter: {}) {
  //     msg
  //     numUids
  //   }
  // }
  
  // mutation DeleteAllAuthors {
  //   deleteAuthor(filter: {}) {
  //     msg
  //     numUids
  //   }
  // }
  
  // mutation DeleteAllTags {
  //   deleteTag(filter: {}) {
  //     msg
  //     numUids
  //   }
  // }
  
  //   payload = `
  //   {
  //     "quote":
  //     {
  //       "originalText": ${quote.originalText},
  //       "quoteBody": ${quote.quoteBody},
  //       "author": {
  //         "name": ${quote.author.name},
  //         "title": ${quote.author.title}
  //       },
  //       "tags": [${quote.tags}],
  //       "source": ${quote.source}
  //     }
  // }
  // `
  console.log(`🚀 ~ file: index.dgraph.getQuote.js ~ line 62 ~ get ~ payload`, payload)
    payload = JSON.parse(payload)
    console.log(`🚀 ~ file: index.dgraph.getQuote.js ~ line 64 ~ get ~ payload`, payload)
    console.log(`🚀 ~ file: index.dgraph.getQuote.js ~ line 60 ~ get ~ quote`, quote)

    query = gql`mutation UpsertQuote($quote: [AddQuoteInput!]!) {
      addQuote(input: $quote, upsert: true) {
        quote {
          id
          quoteBody
          originalText
          author {
            name
            title
          }
          tags {
            name
          }
          source {
            name
          }
        }
      }
    },
    `
  }
  let varQuote = `{
    "quote": 
      {
        "quoteBody": "What a second, is this working on Friday morning?",
        "originalText": "Getting uploads! It's Friday, March 04, 2022",
        "author": {
          "name": "Michael Peiman",
          "title": "Single father seeker of truth and wisdom"
        },
        "tags": {
          "name": "third tag",
          "name": "morning"
        },
        "source": "my introspective mind"
  }
}
  `
  varQuote = JSON.parse(varQuote)

  try {
    await client.request(query, payload).then((res) => {
      console.log(`🚀 ~ file: index.dgraph.getQuote.js ~ line 103 ~ awaitclient.request ~ payload`, payload)
      console.log(`🚀 ~ file: index.json.js ~ line 138 ~ awaitclient.request ~ res`, res)
      console.log(`🚀 ~ file: index.json.js ~ line 138 ~ awaitclient.request ~ res`, res.length)
      data = res.queryQuote
      queryType === "upsertQuote" ? data = res.addQuote.quote : data = res.queryQuote
      console.log(`🚀 ~ file: index.dgraph.getQuote.js ~ line 141 ~ awaitclient.request ~ data`, data)
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