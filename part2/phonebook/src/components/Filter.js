import React from 'react'

const Filter = ({handleFilterChange, handleResetSearch, filterName}) => {
    return (
    <div>
    <label htmlFor='peopleFilter'>Filter shown with</label>
    <input 
        type="text" 
        id="peopleFilter" 
        onChange={handleFilterChange} 
        value={filterName}/>
        <button type="button" onClick={handleResetSearch}>clear search</button>
    </div>
    )
}

export default Filter