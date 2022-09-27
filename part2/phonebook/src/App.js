import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [filterName, setFilterName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    
    const newPerson = {
      id: persons.length + 1,
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
      //console.log(newPerson, 'was added to the contacts');
      console.log(newName, 'was added to the contacts with phone #', newNumber);
      setPersons(persons.concat(newPerson))
      setNewNumber('')
      setNewName('')
      // show only added contact
      // setFilterName(newName)
      // setShowAll(false)
      setShowAll(true)
      setFilterName('')
    }
    
  }

  const handleNameChange = (event) => {
    console.log('name changed to ', event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log('number changed to ', event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log('filter changed to ', event.target.value)
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