const { ApolloServer, gql } = require('apollo-server')
const fs = require('fs')
const path = require('path')

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const { getUserId } = require('./utils')

// resolver関数
const resolvers = {
  Query: {
    info: () => 'HackerNewsクローン',
    feed: async (package, args, context) => {
      return context.prisma.link.findMany()
    }
  },
  Mutation: {
    post: (parent, args, context) => {
      const newLink = context.prisma.link.create({
        data: {
          url: args.url,
          description: args.description
        }
      })
      return newLink
    }
  }
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf-8'),
  resolvers,
  context: ({ req }) => {
    return {
      ...req,
      prisma,
      userId: req && req.headers.authorization ? getUserId(req) : null
    }
  }
})

server.listen().then(({ url }) => console.log(`${url}`))
