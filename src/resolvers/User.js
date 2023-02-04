function feed(package, args, context) {
  return context.prisma.link.findMany()
}

module.exports = {
  feed
}
