import { useState } from 'react'



const Person = ({person}) => <td>{person.name}</td>
const Persons = ({persons}) => {
  return (
    <table>
      <tbody>
        {persons.map(person => <tr key={person.id}><Person person={person}/></tr>)}
      </tbody>
    </table>
  )
}


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      id: 1 }
  ]) 
  const [newName, setNewName] = useState('')
  

  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    
    const newPerson = {
      id: persons.length + 1,
      name: newName
    }
    const personsNames = persons.map(person => person.name.toLowerCase())
    console.log('list of names', personsNames)
    
    const nameAlreadyExists = personsNames.includes(newName.toLowerCase())
    console.log('Name already exists', nameAlreadyExists)

    if (nameAlreadyExists) {
      alert(`${newName} is already added to the phonebook`)
    } 
    else {
      //console.log(newPerson, 'was added to the contacts');
      console.log(newName, 'was added to the contacts');
      setPersons(persons.concat(newPerson))
      setNewName('')
    }
    
  }

  const handleNameChange = (event) => {
    //console.log('name changed to ', event.target.value)
    setNewName(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          <label htmlFor="newName">name: </label>
          <input 
            id="newName" 
            onChange={handleNameChange}
            value={newName}
            type="text"/>
        </div>
        <div>
          <button type="submit" disabled={Boolean(!newName)} >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons persons={persons}/>
    </div>
    
  )
}

export default App