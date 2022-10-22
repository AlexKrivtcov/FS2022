const mostLikes = require('../utils/list_helper').mostLikes
const testArrays = require('./testArrays')

describe('most likes', () => {

  const mostLikesAuthor = {
    author: 'Edsger W. Dijkstra',
    likes: 27
  }
  const oneBlogOnly = {
    author: 'Edsger W. Dijkstra',
    likes: 15
  }

  test('when list has no blogs', () => {
    const result = mostLikes(testArrays.emptyArray)
    expect(result).toEqual(undefined)
  })
  test('when list has only one blog', () => {
    const result = mostLikes(testArrays.listWithOneBlog)
    expect(result).toEqual(oneBlogOnly)
  })

  test('when list has multiple blogs', () => {
    const result = mostLikes(testArrays.blogs)
    expect(result).toEqual(mostLikesAuthor)
  })
})