const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const APP_SECRETS = require('../utils')

// ユーザーの新規登録のリゾルバ
async function signup(parent, args, context) {
  // パスワード設定
  const password = await bcrypt.hash(args.password, 10)

  // ユーザーの新規作成
  const user = await context.prisma.user.create({
    data: {
      ...args,
      password
    }
  })

  const token = jwt.sign({ userId: user.id }, APP_SECRETS)

  return {
    token,
    user
  }
}

// ユーザーログイン
async function login(parent, args, context) {
  const user = await context.prisma.user.findUnique({
    where: { email: args.email }
  })
  if (!user) {
    throw new Error('そのようなユーザーは存在しません')
  }

  // パスワードの比較
  const valid = await bcrypt.compare(args.password, user.parent)
  if (!valid) {
    throw new Error('無効なパスワード')
  }

  // パスワードが正しいとき
  const token = jwt.sign({ userId: user.id }, APP_SECRETS)

  return {
    token,
    user
  }
}

// ニュースを投稿するリゾルバ
async function post(parent, args, context) {
  const { userId } = context
  return await context.prisma.link.create({
    data: {
      url: args.url,
      description: args.description,
      postedBy: { connect: { id: userId } }
    }
  })
}

module.exports = {
  signup,
  login,
  post
}
