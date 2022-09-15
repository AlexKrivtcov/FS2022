const Header = (props) => {
  console.log("header: " + props)
  return (
    <h1>Course: {props.course}</h1>
  )
}

const Part = (props) => {
  console.log("part: " + props)
  return (
    <p>{props.part}: {props.exercises}</p>
  )
}

const Content = (props) => {
  console.log("content: " + props)
  return (
    // step 1 of the exercise
    // <p>
    //    {props.part}: {props.exercises}
    // </p>
    <div>
      <Part  part={props.part1} exercises={props.exercises1}/>
      <Part  part={props.part2} exercises={props.exercises2}/>
      <Part  part={props.part3} exercises={props.exercises3}/>
    </div>  
  )
  
}

const Total = (props) => {
  console.log(props)
  return (
    <p>Number of exercises: {props.exercises}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }

  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  } 
  
  const part3 = {
    name: 'State of a component', 
    exercises: 14
  } 

  return (
    <div>
      <Header course={course}/>

      { // step 1 of the exercise
      /* <Content part={part1} exercises={exercises1} />
      <Content part={part2} exercises={exercises2} />
      <Content part={part3} exercises={exercises3} /> */}

      <Content 
        part1={part1.name} exercises1={part1.exercises} 
        part2={part2.name} exercises2={part2.exercises}
        part3={part3.name} exercises3={part3.exercises}/>

      <Total exercises={part1.exercises+part2.exercises+part3.exercises} />

      
    </div>
  )
}

export default App