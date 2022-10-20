const favoriteBlog = require('../utils/list_helper').favoriteBlog
const testArrays = require('./testArrays')

describe('favorite blog', () => {


  test('when list has no blogs', () => {
    const result = favoriteBlog(testArrays.emptyArray)
    expect(result).toEqual(undefined)
  })
  test('when list has only one blog', () => {
    const result = favoriteBlog(testArrays.listWithOneBlog)
    expect(result).toEqual(testArrays.mostPopular)
  })

  test('when list has multiple blogs', () => {
    const result = favoriteBlog(testArrays.blogs)
    expect(result).toEqual(testArrays.mostPopular)
  })
})