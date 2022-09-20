import React, { useState } from 'react'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)
const StatisticLine = (props) => {
  return (
    <div>
      {props.text} {props.value}
    </div>
  )
}
const Statistics = (props) => {
  if (props.totalNum > 0){
    return(
      <div>
        <StatisticLine text="good" value={props.good}/>
        <StatisticLine text="neutral" value={props.neutral}/>
        <StatisticLine text="bad" value={props.bad}/>
        <StatisticLine text="amount of feedbacks" value={props.totalNum}/>
        <StatisticLine text="average score" value={props.average}/>
        <StatisticLine text="positive feedbacks" value={props.positiveFeedbacks}/>

      </div>
      // <ul>
      //   <li>good {props.good}</li>
      //   <li>neutral {props.neutral}</li>
      //   <li>bad {props.bad}</li>
      //   <li>amount of feedbacks {props.totalNum}</li>
      //   <li>average score {props.average}</li>
      //   <li>positive feedbacks {props.positiveFeedbacks} %</li>
      // </ul>
    )
  }
  return (
    <div>
      No feedback given yet.
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [totalNum, setTotalNum] = useState(0)

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
      <Statistics good={good} neutral={neutral} bad={bad} totalNum={totalNum} average={average} positiveFeedbacks={positiveFeedbacks}/>
    </div>
  )
}

export default App