const jwt = require('jsonwebtoken')

const APP_SECRET = 'Graphql-is-aw3some'

// ユーザーIDを取得するための関数
function getUserId(req, authToken) {
  if (req) {
    // リクエストヘッダー認証権限があるかを確認
    const authHeader = req.headers.authorization
    // 権限があるなら
    if (authHeader) {
      const token = authHeader.replace('Bearer', '')
      if (!token) {
        throw new Error('トークンが見つかりませんでした')
      }
      // トークンを複合する
      const { userId } = getTokenPayload(token)
      return userId
    }
  } else if (authToken) {
    const { userId } = getTokenPayload(authToken)
    return userId
  }
  throw new Error('認証権限がありません')
}

// トークンを複合する関数
function getTokenPayload(token) {
  // トークン化された物の前の情報(user.id)を複合する
  return jwt.verify(token, APP_SECRET)
}

module.exports = {
  APP_SECRET,
  getUserId
}
