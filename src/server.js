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

  type Mutation {
    post(url: String!, description: String!): Link
  }
`

// resolver関数
const resolvers = {
  Query: {
    info: () => 'HackerNewsクローン',
    feed: () => links
  },
  Mutation: {
    post: (parent, args) => {
      let idCount = links.length

      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      }

      links = [...links, link]
      return link
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => console.log(`${url}`))
