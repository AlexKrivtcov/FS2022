const Courses = ({courses}) => courses.map((course) => <Course key={course.id} course={course} />) 

const Course = ({course}) => {
    const Header = ({name}) => {
      //console.log("header: " + name)
      return (
        <h2>Course: {name}</h2>
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
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]


  return (
    <div>
      <h1>Web development curriculum</h1>
      <Courses courses={courses}/>    
    </div>
  
  )
}

export default App