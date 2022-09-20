import { useState } from 'react'

const Button = (props) => {

  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}
const Anecdote = (props) => {
  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>
        {props.anecdotes[props.selected]}
      </p>
    </div>
    
  )
}

const AnecdoteScore = (props) => {
  return (
    <p>
      has <b>{props.points[props.selected]}</b> votes
    </p>
  )
}

const BestAnecdote = (props) => {
  const maxVote = Math.max(...props.points)
  const maxVotePosition = props.points.indexOf(maxVote)
  //console.log("max vote number is", maxVote)
  //console.log("position of the max number votes in array", maxVotePosition)

  if (maxVote > 0) {
    return(
      <div>
        <p>{props.anecdotes[maxVotePosition]}</p>
        <AnecdoteScore points={props.points} selected={maxVotePosition}/>
      </div>
    )
  }
  return (
    <div>There is no votes yet</div>
  ) 
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))

  // random selection of the array element
  function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }
  //console.log("current points array", points)
  
  const nextAnecdote = () => {
    setSelected(getRandomInt(anecdotes.length))
  }
  const vote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }  

  //console.log("selected anecdote in position", selected)

  return (
    <div>

      <Anecdote anecdotes={anecdotes} selected={selected}/>
      <AnecdoteScore points={points} selected={selected}/>
      <Button onClick={vote} text="vote" />
      <Button onClick={nextAnecdote} text="Next anecdote" />  
      <h2>Anecdote with most votes</h2>   
      <BestAnecdote points={points} anecdotes={anecdotes}/>
    </div>
  )
}

export default App