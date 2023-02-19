const { ApolloServer, PubSub, gql } = require('apollo-server')
const fs = require('fs')
const path = require('path')

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
// サブスクリプションの実装
// Publisher(送信者)/Subscriber(受信者)
const pubsub = new PubSub()

const { getUserId } = require('./utils')

// リゾルバ関係のファイル
const Link = require('./resolvers/Link')
const User = require('./resolvers/User')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const Subscription = require('./resolvers/Subscription')
const Vote = require('./resolvers/Vote')

// resolver関数
const resolvers = {
  Link,
  User,
  Query,
  Mutation,
  Subscription,
  Vote
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf-8'),
  resolvers,
  context: ({ req }) => {
    return {
      ...req,
      prisma,
      pubsub,
      userId: req && req.headers.authorization ? getUserId(req) : null
    }
  }
})

server.listen().then(({ url }) => console.log(`${url}`))
