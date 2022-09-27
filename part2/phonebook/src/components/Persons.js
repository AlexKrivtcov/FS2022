import React from 'react'

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

export default Persons