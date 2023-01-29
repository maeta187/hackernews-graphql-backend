// データベースにアクセスするためのクライアントライブライ
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  const newLink = await prisma.link.create({
    data: {
      description: 'GraphQLチュートリアル',
      url: 'www.udemy-graphql-tutorial.cpm'
    }
  })
  const allLinks = await prisma.link.findMany()
  console.log(allLinks)
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    // データベースを閉じる
    prisma.$disconnect
  })
