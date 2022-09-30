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

  const resetFields = () => {
    setNewNumber('')
    setNewName('')
    setShowAll(true)
    setFilterName('')
  }


  const hook = () => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }
  useEffect(hook, [])

  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
     
    const newPerson = {
      name: newName,
      number: newNumber
    }
    const personsNames = persons.map(person => person.name.toLowerCase())
    //console.log('list of names', personsNames)
    
    const nameAlreadyExists = personsNames.includes(newName.toLowerCase())
    console.log('Name already exists', nameAlreadyExists)
    if (!newNumber) {
      alert(`Number field is empty`)
    }
    else if (nameAlreadyExists) {
      if (window.confirm(`${newName} is already added to the phonebook, do you want the number to be updated with the new one?`)){
        const currentPersonId = persons.find(person => person.name.toLowerCase() === newPerson.name.toLowerCase()).id
        //console.log(currentPersonId)
        personService
        .updateNumber(currentPersonId, newPerson)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== currentPersonId ? p : returnedPerson))
          setNewNumber('')
          setNewName('')
          console.log(`The number for ${newName} was updated`)
        })
      }
    } 
    
    else {
      personService
      .addPerson(newPerson)
      .then(returnedPersons => {
        setPersons(persons.concat(returnedPersons))
        console.log(`"${returnedPersons.name}" added to the server database`)
        resetFields()
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

  const handleRemove = (id) => {
    const personToBeRemoved = persons.find(p => p.id === id).name
    console.log(`person to be removed - ${personToBeRemoved}`)
    if (window.confirm(`Do you really want to remove ${personToBeRemoved} from the contacts?`)){
      //console.log(id)
      personService
      .removePerson(id)
      .then(() => {
        setPersons(persons.filter (person => person.id !== id))
        console.log(`person with id ${id} was removed`)
        resetFields()  
      })
    } 
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
      <Persons persons={persons} 
              showAll={showAll} 
              filterName={filterName} 
              handleRemove={handleRemove}/>
    </div>
    
  )
}

export default App