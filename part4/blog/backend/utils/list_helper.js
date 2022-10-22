const logger = require('./logger')
var _ = require('lodash')

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

const favoriteBlog = (blogs) => {
  //const firstMostPopular = Math.max(...blogs.map(blog => blog.likes))
  const firstMostPopular = blogs.reduce((prev, current) => (prev.likes >= current.likes) ? prev : current, {})

  if (Object.entries(firstMostPopular).length === 0){ return undefined} else {
    const { title, author, likes } = firstMostPopular
    return {
      title,
      author,
      likes
    }
  }
}
const mostBlogs = (blogs) => {
  const mostBlogsAuthor = _(blogs).groupBy('author').map((value, key) => {
    return {
      author: key,
      blogs: value.length
    }
  }).maxBy('blogs')

  //logger.info(JSON.stringify(mostBlogsAuthor, null))
  return mostBlogsAuthor
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}