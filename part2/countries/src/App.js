import { useState, useEffect } from 'react'
import axios from 'axios' 

const Filter = ({handleFilterChange}) => {
  return (
    <div>
    <label htmlFor='countriesFilter'>Find countries</label>
    <input 
        type="text" 
        id="countriesFilter" 
        onChange={handleFilterChange}
        />
    </div>
    )
}
const SearchResult = ({filterName, countries}) =>{
  if (filterName) {
    const countriesToShow = countries.filter(country => 
      country.name.official.toLowerCase().includes(filterName.toLowerCase())
      ||
      country.name.common.toLowerCase().includes(filterName.toLowerCase())
      )
    console.log(countriesToShow)
    console.log("countries found: ", countriesToShow.length)
    if (countriesToShow.length > 10) {
      return (
        <div>
          Too many matches, make your request more specific 
        </div>
      )
    }
    else if (countriesToShow.length > 1 && countriesToShow.length <= 10){
      return (
        <ul>
          {
            countriesToShow.map(country=> <li key={country.name.official}>{country.name.official} (common name: {country.name.common})</li>)
          }
        </ul>
      )
    }
    else if (countriesToShow.length === 1) {
      const country = countriesToShow[0]
      const keys = Object.keys(country.languages)
      console.log("keys: ", keys)
      console.log(country.languages)
      return (
        <div>
          <h2>{country.name.official}</h2>
          <p>The capital: {country.capital}</p>
          <p>Total area: {country.area}</p>
          <h3>Languages:</h3>
          <ul>
            {keys.map(
              key => 
              <li key={key}>{country.languages[key]}</li>
            )}  

          </ul>
          <div>
            <img src={country.flags.png} alt={country.name.official}/>
          </div>
        </div>
      )
    }
  }
  return (
    <div>
      Please specify parameters for search to start
    </div>
  )
}


const App = () => {
const [countries, setCountries] = useState([])
const [filterName, setFilterName] = useState("")

  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        //console.log(response.data)
        setCountries(response.data)
      })
  }
  useEffect(hook, [])

  const handleFilterChange = (event) => {
    console.log('filter changed to ', event.target.value)
    setFilterName(event.target.value)
  }

  return(
    <div>
      <Filter handleFilterChange={handleFilterChange}/>
      <SearchResult filterName={filterName} countries={countries}/>
    </div>
  )

}

export default App