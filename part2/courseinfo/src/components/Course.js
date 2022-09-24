import React from 'react'


const Header = ({name}) => {
  //console.log("header: " + name)
  return (
    <h2>Course: {name}</h2>
  )
}
const Part = ({part}) => {
  //console.log('part', part)
  return (
    <tr >
      <td>{part.name}</td>
      <td>{part.exercises}</td>
    </tr>
  ) 
}    
const Content = ({parts}) => {
  // const partsNames = parts.map((part) => part.name)
  // console.log(partsNames)
  return (
    <table>
      <tbody>
          {parts.map((part) => {
              //console.log(part.id)
              return <Part key={part.id} part={part} />
          })
          }
      </tbody>
    </table>
  )
}
const Total = ({parts}) => {
  const totalAmount = parts.reduce((sum, part) => sum + part.exercises, 0)
  return <p><strong>Total of {totalAmount} exercises</strong></p>
}
const Course = ({course}) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
    
  )
}

export default Course