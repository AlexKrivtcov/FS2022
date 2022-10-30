const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})
blogsRouter.get('/:id', async (request, response) => {

  const blog = await Blog.findById(request.params.id)

  if (blog) {
    response.json(blog)
  }
  else {
    response.status(404).json('No such blog found')
  }
})
blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body
  const user = await request.user
  //console.log(`user ${user}`)

  if (!body.title || !body.url){
    response.status(400).json('Bad request: "Title" and "url" are empty')
  }
  else {
    const blog = new Blog({
      url: body.url,
      title: body.title,
      author: body.author,
      likes: body.likes || 0,
      user: user._id
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  }
})
blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const user = await request.user

  //console.log(`user ${user}`)
  const blog = await Blog.findById(request.params.id)
  //console.log(`${blog} and user is ${user}`)
  if (!blog) {
    return response.status(404).json({ error: 'No such blog found' })
  }
  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    response.status(403).json({ error: 'no rights to perform the delete action' })
  }
})
blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = {
    likes: body.likes
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  //console.log(`updatedBlog ${updatedBlog}`)
  response.json(updatedBlog)
})

module.exports = blogsRouter