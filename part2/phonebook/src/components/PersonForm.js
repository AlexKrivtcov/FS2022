import React from 'react'

const PersonForm = ({addName, handleNameChange, newName, newNumber, handleNumberChange}) => {
    return (
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
    )
  }

export default PersonForm