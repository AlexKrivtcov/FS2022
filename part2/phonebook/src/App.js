import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [filterName, setFilterName] = useState('')

  const hook = () => {

    axios
      .get('http://localhost:3001/persons')
      .then(response => {

        setPersons(response.data)
      })
  }
  useEffect(hook, [])

  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
     
    const newPerson = {
      //id: persons.length + 1,
      name: newName,
      number: newNumber
    }
    const personsNames = persons.map(person => person.name.toLowerCase())
    console.log('list of names', personsNames)
    
    const nameAlreadyExists = personsNames.includes(newName.toLowerCase())
    console.log('Name already exists', nameAlreadyExists)

    if (nameAlreadyExists) {
      alert(`${newName} is already added to the phonebook`)
    } 
    else if (!newNumber) {
      alert(`Number field is empty`)
    }
    else {
      personService
      .addPerson(newPerson)
      .then(returnedPersons => {
        setPersons(persons.concat(returnedPersons))
        console.log(`new person added to the server ${returnedPersons}`)
        setNewNumber('')
        setNewName('')
        setShowAll(true)
        setFilterName('')
      })
    }
    
  }

  const handleNameChange = (event) => {
    //console.log('name changed to ', event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    //console.log('number changed to ', event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    //console.log('filter changed to ', event.target.value)
    setFilterName(event.target.value)

    if (filterName.length === 0) { 
      setShowAll(false)
    }

  }
  const handleResetSearch = (event) =>{
    setShowAll(true)
    setFilterName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange}
        handleResetSearch={handleResetSearch}
        filterName={filterName}/>
      <PersonForm 
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
        addName={addName}/>
      <h2>Numbers</h2>
      <Persons persons={persons} showAll={showAll} filterName={filterName}/>
    </div>
    
  )
}

export default App