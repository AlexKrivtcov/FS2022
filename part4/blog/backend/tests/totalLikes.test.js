const totalLikes = require('../utils/list_helper').totalLikes
const testArrays = require('./testArrays')

describe('total likes', () => {


  test('when list has only one blog, equals the likes of that', () => {
    const result = totalLikes(testArrays.listWithOneBlog)
    expect(result).toBe(15)
  })

  test('when list has multiple blogs with multiple likes', () => {
    const result = totalLikes(testArrays.blogs)
    expect(result).toBe(36)
  })
})