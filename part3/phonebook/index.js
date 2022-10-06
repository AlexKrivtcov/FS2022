const express = require('express')
const app = express()
const morgan = require('morgan')
app.use(express.json())


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
    console.log(randomId)
    return randomId
}

const info = () => {
    const personsTotal = persons.length > 0 ? persons.length : 0
    const currentDate = new Date()
    return(
        `<div>
            <p>Phonebook has info for ${personsTotal} people</p>
            <p>${currentDate}</p>
        </div>`
    )
}

app.use(morgan('tiny'))

app.get('/', (request, response) => {
    response.send('<h1>Welcome to Phonebook!</h1>')
  })
  
app.get('/api/persons', (request, response) => {
    response.json(persons)
})
app.get('/info', (request, response) => {

    response.send(info())
})
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    //console.log(id)
    const person = persons.find(person => person.id === id)
    console.log(person)
    if (person) {
        response.json(person)
    } else {
        response.status(404).send(`Sorry, The person with the ID <strong>${id}</strong> doesn't exist`).end()
    }
})
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
})

app.post('/api/persons/', (request, response) => {
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
    else if (persons.find(person => person.name == body.name)) {
        return response.status(400).json({ 
            error: 'Name must be unique' 
        })
    }
    
      const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
      }
    
      persons = persons.concat(person)
    
      response.json(person)
  })
  

const PORT = 3001
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
}) 