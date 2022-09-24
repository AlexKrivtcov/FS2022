
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
    return (
      <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
      </div>
      
    )
}

// const Total = ({course}) => {
//   const total = course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises
//   return (
//     <p>Number of exercises: {total}</p>
//   )
// }

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
        name: 'State of a component 2',
        exercises: 17,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App