const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

APP_SECRETS = 'Graphql'

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

