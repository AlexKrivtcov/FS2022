const logger = require('./logger')
const dummy = () => {

  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    //logger.info(`Likes ----- ${item.likes}`)
    return sum + item.likes
  }
  return blogs.reduce(reducer, 0)
}

module.exports = {
  dummy,
  totalLikes
}