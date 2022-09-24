
const Course = ({course}) => {
    const Header = ({name}) => {
      //console.log("header: " + name)
      return (
        <h1>Course: {name}</h1>
      )
    }
    const Content = ({parts}) => {
      // const partsNames = parts.map((part) => part.name)
      // console.log(partsNames)
      const Part = ({part}) => {
        //console.log('part', part)
        return (
          <tr >
            <td>{part.name}</td>
            <td>{part.exercises}</td>
          </tr>
        ) 
      }
      return (
        <table>
          <tbody>
            {parts.map((part) => 
              {
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
    return (
      <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
      
    )
}



const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App