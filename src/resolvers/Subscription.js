function newLinkSubscription(parent, args, context) {
  return context.pubsub.asyncIterator('NEW_LINK')
}

const newLink = {
  subscribe: newLinkSubscription,
  resolve: (payload) => {
    return payload
  }
}

module.exports = {
  newLink
}
