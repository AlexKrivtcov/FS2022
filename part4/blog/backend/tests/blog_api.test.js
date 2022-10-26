const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('when there are blogs in the database', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
  test('a specific blog\'s title is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)
    expect(titles).toContain('React patterns')
  })

  test('unique identifier is id not _id', async () => {
    const blogs = await helper.blogsInDb()

    expect(blogs.map(b => b.id)).toBeDefined()
    expect(blogs[0]._id).toBeUndefined()
  })
})

describe('viewing a specific blog', () => {
  test('view a valid blog with valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToView = blogsAtStart[0]
    const resultBlog = await api.get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))
    expect(resultBlog.body).toEqual(processedBlogToView)
  })
  test('fails with statuscode 404 if blog does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    await api.get(`/api/blogs/${validNonexistingId}`)
      .expect(404)
  })

  test('fails with statuscode 400 id is invalid', async () => {
    const invalidID = '5a3d5da59070081a82a3445'
    await api.get(`/api/blogs/${invalidID}`)
      .expect(400)
  })
})
describe('deleting a blog', () => {

  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    await api.delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
    const blogsAfter = await helper.blogsInDb()
    expect(blogsAfter).toHaveLength(helper.initialBlogs.length - 1)
    const titles = blogsAfter.map(blog => blog.title)
    expect(titles).not.toContain(blogToDelete.title)
  })

})

describe('add a new blog', () => {
  test('a valid blog can be added ', async () => {
    const newBlog = {
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    //console.log(blogsAtEnd)
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(n => n.title)
    expect(titles).toContain(
      'Type wars'
    )
  })
  test('like property is missing', async () => {
    const newBlog = {
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html'
    }

    const result = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(result.body.likes).toEqual(0)
  })
  test('title or urls is missing', async () => {
    const newBlog = {
      author: 'Robert C. Martin',
      likes: 12
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
})

describe('update a blog', () => {
  test('update amount of likes', async () => {
    const dataToUpdate = {
      likes: 70
    }
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedBlog = await api.put(`/api/blogs/${blogToUpdate.id}`)
      .send(dataToUpdate)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    //console.log(`${updatedBlog.body.likes} should be equal to ${dataToUpdate.likes}`)
    expect(updatedBlog.body.likes).toEqual(dataToUpdate.likes)

    const blogsAtEnd = await helper.blogsInDb()
    const updatedReturnedBlog = blogsAtEnd.find( x => x.id === blogToUpdate.id)
    //console.log(updatedReturnedBlog)
    expect(updatedReturnedBlog.likes).toEqual(dataToUpdate.likes)
  })
})


afterAll(() => {
  mongoose.connection.close()
})