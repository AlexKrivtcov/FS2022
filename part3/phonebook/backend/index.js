const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

const Person = require('./models/person')


app.use(express.static('build'))
app.use(express.json())
const morgan = require('morgan')
app.use(cors())



morgan.token('profile', function getData(request, response) {
    if (request.method === "POST" ) {
        return JSON.stringify(request.body)
    } 
    return " "
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :profile'))

const info = (count) => {
    const currentDate = new Date()    
    return(
        `<div>
            <p>Phonebook has info for ${count} people</p>
            <p>${currentDate}</p>
        </div>`
    ) 
}



app.get('/', (request, response) => {
    response.send('<h1>Welcome to Phonebook!</h1>')
  })
  
app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons =>{
        //console.log(persons)
        response.json(persons)
    })
})

app.get('/info', (request, response) => {
    Person.count().then(count => {
        response.send(info(count))
    })
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
    .catch(error => {
        console.log(error)
        response.status(404).send(`Sorry, The person with the ID <strong>${id}</strong> doesn't exist`)
    })

})
app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result =>{
            response.status(204).end()
        })
        .catch(error =>next(error))
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name) {
        return response.status(400).json({ 
            error: 'Name is missing' 
        })
    }
    else if (!body.number) {
        return response.status(400).json({ 
            error: 'Number is missing' 
        })
    } 
      const person = new Person ({
        name: body.name,
        number: body.number,
      })
      person.save().then(savedPerson => {
        response.json(savedPerson)
      }) 
  })

  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  app.use(unknownEndpoint)

  const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } 
  
    next(error)
  }
  
  // this has to be the last loaded middleware.
  app.use(errorHandler)

  const PORT = process.env.PORT 
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })