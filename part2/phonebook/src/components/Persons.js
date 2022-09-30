import React from 'react'

const Person = ({person, handleRemovePerson}) => 
  <tr>
    <td>{person.name}</td>
    <td>{person.number}</td>
    <td><button type="button" onClick={handleRemovePerson}>delete</button></td>
  </tr>

const ListToShow = ({list, handleRemove}) => {
  return (
    <table>
      <tbody>
        {list.map(person => 
          <Person key={person.id} person={person} handleRemovePerson = {() => handleRemove(person.id)}/>
        )}
      </tbody>
    </table>
  )
  
} 
const Persons = ({persons, showAll, filterName, handleRemove}) => {  
  if (showAll) {
    return (
      <ListToShow list={persons} handleRemove={handleRemove} />
    )
  }
  else {
    const peopleToShow = persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))
    return (
      <ListToShow list={peopleToShow} handleRemove={handleRemove} />
    )
  }
}

export default Persons