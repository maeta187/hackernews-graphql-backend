const { ApolloServer, gql } = require('apollo-server')

// GraphQLのスキーマー
const typeDefs = gql`
  type Query {
    info: String!
  }
`

// resolver関数
const resolvers = {
  Query: {
    info: () => 'HackerNewsクローン'
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => console.log(`${url}`))
