import React, { useState } from 'react'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const[totalNum, setTotalNum] = useState(0)

  const addFeedbackToCategory = (category, setCategory) => setCategory(category + 1)

  const addFeedback = () => setTotalNum(totalNum + 1)

  const average = ((good - bad)/totalNum)
  const positiveFeedbacks = (good/totalNum*100)


  const feedbackGood = () => {
    addFeedback()
    addFeedbackToCategory(good, setGood) 
  }
  
  const feedbackNeutral = () => {
    addFeedback()
    addFeedbackToCategory(neutral, setNeutral)
    
  }
  const feedbackBad = () => {
    addFeedback()
    addFeedbackToCategory(bad, setBad)
  }
  
  

  return (
    <div>
      <h2>give a feedback</h2>
      <Button onClick={feedbackGood} text="good"/>
      <Button onClick={feedbackNeutral} text="neutral"/>
      <Button onClick={feedbackBad} text="bad"/>
      <h2>Statistics:</h2>
      <ul>
        <li>good {good}</li>
        <li>neutral {neutral}</li>
        <li>bad {bad}</li>
        <li>amount of feedbacks {totalNum}</li>
        <li>average score {average}</li>
        <li>positive feedbacks {positiveFeedbacks} %</li>
      </ul>
    </div>
  )
}

export default App