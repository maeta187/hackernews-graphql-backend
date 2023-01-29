const { ApolloServer, gql } = require('apollo-server')

//HackerNewsのデータ
let links = [
  {
    id: 'link-0',
    description: 'GraphQLチュートリアル',
    url: 'www.udemy-graphql-tutorial.cpm'
  }
]

// GraphQLのスキーマー
const typeDefs = gql`
  type Link {
    id: ID!
    description: String!
    url: String
  }

  type Query {
    info: String!
    feed: [Link]!
  }

  }
`

// resolver関数
const resolvers = {
  Query: {
    info: () => 'HackerNewsクローン',
    feed: () => links
  },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => console.log(`${url}`))
