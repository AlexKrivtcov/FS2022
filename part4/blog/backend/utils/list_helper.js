const dummy = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item
  }

  //return blogs.reduce(reducer, 0) / blogs.length
  return 1
}

module.exports = {
  dummy
}