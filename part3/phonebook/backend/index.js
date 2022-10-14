require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./models/person')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))


morgan.token('profile', function getData(request, response) {
    if (request.method === "POST" ) {
        return JSON.stringify(request.body)
    } 
    return " "
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :profile'))
// app.use(morgan(':profile'))
let persons = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
      },
      { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
      },
      { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
      },
      { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
      }
]

const generateId = () => {
    const randomId = Math.floor(Math.random()*1000000)
    //console.log(randomId)
    return randomId
}

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
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
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
    // else if (persons.find(person => person.name == body.name)) {
    //     return response.status(400).json({ 
    //         error: 'Name must be unique' 
    //     })
    // }
    
      const person = new Person ({
        name: body.name,
        number: body.number,
      })
      person.save().then(savedPerson => {
        response.json(savedPerson)
      }) 
  })
  

  const PORT = process.env.PORT 
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })