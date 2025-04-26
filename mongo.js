const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fperez:${password}@cluster0.q7vmyl0.mongodb.net/userApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  isActive: Boolean,
})

const User = mongoose.model('Users', userSchema)

/* 
 // Creacion de nuevos usuarios

  const user = new User({
  name: "Rodolfo",
  email: "rodolfo@correo.com.do",
  password: "1234",
  isActive: false
})

user.save().then(result => {
  console.log('user saved!')
  mongoose.connection.close()
}) */

  // Filtro de busqueda de usuarios

  User.find({}).then(result => {
    result.forEach(user => {
      console.log(user)
    })
    mongoose.connection.close()
  })