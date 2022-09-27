import { useState } from 'react'



const Person = ({person}) => <tr><td>{person.name}</td><td>{person.number}</td></tr>


const Persons = ({persons, showAll, filterName}) => {
   
  if (showAll) {
    return (
      <table>
        <tbody>
          {persons.map(person => <Person key={person.id} person={person}/>)}
        </tbody>
      </table>
    )
  }
  else {
    const peopleToShow = persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))
    return (
      <table>
        <tbody>
          {peopleToShow.map(person => <Person key={person.id} person={person}/>)}
        </tbody>
      </table>
    )
  }
}



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
    console.log('show all', showAll) 
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
      <div>
        <label htmlFor='peopleFilter'>Filter shown with</label>
        <input 
          type="text" 
          id="peopleFilter" 
          onChange={handleFilterChange} 
          value={filterName}/>
          <button type="button" onClick={handleResetSearch}>clear search</button>
      </div>
      <form onSubmit={addName}>
        <h2>Add a new contact</h2>
        <div>
          <label htmlFor="newName">name: </label>
          <input 
            id="newName" 
            onChange={handleNameChange}
            value={newName}
            type="text"/>
        </div>
        <div>
          <label htmlFor="newNumber">number: </label>
          <input 
            id="newNumber" 
            onChange={handleNumberChange}
            value={newNumber}
            type="tel"/>
        </div>
        <div>
          <button type="submit" disabled={Boolean(!newName)} >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons persons={persons} showAll={showAll} filterName={filterName}/>
    </div>
    
  )
}

export default App