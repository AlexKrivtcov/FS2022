const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://persons-app:${password}@cluster0.bn0behl.mongodb.net/personApp?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (name && password) {
  mongoose
    .connect(url)
    .then(() => {
      if (name && password){
        const person = new Person({
          name: name,
          number: number,
        })
        console.log(`added ${person.name} number ${person.number} to phonebook`)
        return person.save()
      }
    })
    .then(() => {
      console.log('connection closed!')
      return mongoose.connection.close()
    })
    .catch((err) => console.log(err))
} else {
  mongoose
    .connect(url)
    .then(() => {
      Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(person => {
          console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
        console.log('END connection closed!')
      })
    })
    .catch((err) => console.log(err))
}