const express = require('express')
const { stringify } = require('querystring')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./user')

app.use(cors())
app.use(express.json())

// Configuración de Morgan
morgan.token('body', (req) => req.method === 'POST' ? JSON.stringify(req.body) : '') // Token personalizado para mostrar el body solo en POST
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body')) // Middleware de logging

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
          name: 'ss',
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


  //Codigo de la base de datos

  //recibir usuarios
 app.get('/users', (req, res) => {
    User.find({}).then(users => {
      res.json(users)
    })
  })

  //recibir usuarios por id
  app.get('/users/:id', (request, response) => {
    User.findById(request.params.id).then(user => {
      response.json(user)
    })
  })

  //crear usuarios
  app.post('/users', (request, response) => {
    const { name, email, password, isActive } = request.body;
  
    if (!name || !email || !password) {
      return response.status(400).json({ error: 'Name, email, or password is missing' });
    }
  
    const user = new User({
      name,
      email,
      password,
      isActive: isActive !== undefined ? isActive : false,
    });
  
    user.save()
    .then(savedUser => {
      response.json(savedUser);
    })
    .catch(error => {
      console.error(error);
      response.status(500).json({ error: 'Failed to save user' });
    });

  })


  

  app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })

  app.get('/course', (req, res) => {
    const course = courses.map(course => course)
    res.json(course)
  })

 
  
  app.get('/courses/:id', (request, response) => {
    const id = Number(request.params.id)
    const course = courses.find(course => course.id === id)
  if (course) {
    response.json(course)
  } else {
    response.status(404).end()
  }
  })

  app.get('/courses/:id1/:id2', (request, response) => {

    const id1 = Number(request.params.id1)

    const id2 = Number(request.params.id2)

    const course = courses.find(course => course.id === id1);


 if (!course) {
        return response.status(404).json({ error: "Course not found" });
    }

    // Buscar la parte dentro del curso encontrado
    const part = course.parts.find(part => part.id === id2);

    if (!part) {
        return response.status(404).json({ error: "Part not found in this course" });
    }

    // Responder con la parte específica
    response.json(part);
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    
    // Buscar si la persona existe antes de eliminarla
    const personExists = persons.some(person => person.id === id);

    if (!personExists) {
        return response.status(404).json({ error: "Person not found" });
    }

    // Filtrar y eliminar la persona del array
    persons = persons.filter(person => person.id !== id);

    // Responder con 204 sin contenido
    response.status(204).end();
});


  const generateId = () => {
    const randomID = Math.random(999)
    console.log(randomID)
    return randomID
  }
  
  app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body.name) {
      return response.status(400).json({ 
        error: 'name missing' 
      })
    }  
    
    // Verifica si el nombre ya existe en la lista de personas
    if (persons.some(person => person.name === body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        });
    }

  
    const person = {
      name: body.name,
      number: body.number,
      id: generateId(),
    }
  
    persons = persons.concat(person)
  
    response.json(person)
  })
 

  const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })