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
const Country = ({country, singleCountry}) => {
  const keys = Object.keys(country.languages)
  //console.log("keys: ", keys)
  //console.log(country.languages)
  
  const [displayExtra, setDisplayExtra] = useState(singleCountry)
  const stateExtra = displayExtra ? "block" : "none"
  const stateGeneral = singleCountry ? "none" : "block"

  const handleShowCountry = (event) => {
    setDisplayExtra(!displayExtra)
  }
  return (
    <div>
      <p style={{display: stateGeneral}}>
        <span>
          {country.name.official} (common name: {country.name.common})
        </span>
        <span>
          <button type="button" onClick={handleShowCountry}>
            {!displayExtra ? "Show information" : "Hide iformation"}
            </button>
        </span>
      </p>
      <div style={{display: stateExtra}}>
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
    //console.log(countriesToShow)
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
        <div>
          {
            countriesToShow.map(country=> 
            <div key={country.name.official}>
              <Country country={country}/> 
            </div>)
          }
        </div>
      )
    }
    else if (countriesToShow.length === 1) {
      const country = countriesToShow[0]
      const singleCountry = true
      
      return (
        <Country country={country} singleCountry={singleCountry}/>
      )
    }
    else if (countriesToShow.length === 0){
      return(
      <div>
        There is no result, try to change your search word
      </div>)
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
    //console.log('filter changed to ', event.target.value)
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