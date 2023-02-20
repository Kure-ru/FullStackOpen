const express = require('express')
const { token } = require('morgan')
const morgan = require('morgan');
const cors = require('cors')


const app = express()
app.use(express.json())
app.use(cors())

  // `````````  
// show the data sent in HTTP POST requests
// `````

app.use(morgan('tiny'));

morgan.token('body', (request, response, parameter) => JSON.stringify(request.body));

app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'));


let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    },
    {
      "id": 5,
      "name": "Claire Dochez", 
      "number": "080-3828-1902"
    }
]
  
  app.get('/api/persons', (request, response) => {
    response.json(persons)
  })
  
  const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0
    return maxId + 1
  }

  app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.content) {
        return response.status(400).json({ 
          error: 'content missing' 
        })
      }

    if (persons.find(person => person.name === body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }
const person = {
        name: body.name,
        number: body.number,
        id: generateId,
      }
    
      persons = persons.concat(person)
    
      response.json(person)
    })
    
    app.get('/api/persons/:id', (request, response) => {
        const id = Number(request.params.id)
        const person = persons.find(person => person.id === id)
      
        if (person) {
          response.send(persontext(person))
        } 
        else 
        {
          response.status(404).end()
        }
      
        response.json(person)
      })
      
      app.delete('/api/persons/:id', (request, response) => {
        const id = Number(request.params.id)
        persons = persons.filter(person => person.id !== id)
        response.status(204).end()
      })
      
  
// info page
app.get('/info', (request, response) => {
    const date = new Date();
    response.send(`
    <p>Phonebook has info for ${persons.length} people </p> 
    <p>${date} </p>`)
  })
  
// definition of port application
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})