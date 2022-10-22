const mostBlogs = require('../utils/list_helper').mostBlogs
const testArrays = require('./testArrays')

describe('most blogs', () => {

  const mostBlogsAuthor = {
    author: 'Robert C. Martin',
    blogs: 3
  }
  const oneBlogOnly = {
    author: 'Edsger W. Dijkstra',
    blogs: 1
  }

  test('when list has no blogs', () => {
    const result = mostBlogs(testArrays.emptyArray)
    expect(result).toEqual(undefined)
  })
  test('when list has only one blog', () => {
    const result = mostBlogs(testArrays.listWithOneBlog)
    //console.log(`result when list has only one blog ${JSON.stringify(result)}`)
    expect(result).toEqual(oneBlogOnly)
  })

  test('when list has multiple blogs', () => {
    const result = mostBlogs(testArrays.blogs)
    //console.log(`result when list has multiple blogs ${JSON.stringify(result)}`)
    expect(result).toEqual(mostBlogsAuthor)
  })
})