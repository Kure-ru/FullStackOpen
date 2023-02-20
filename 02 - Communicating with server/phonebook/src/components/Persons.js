import React from 'react'

const Persons = ({ persons, searchedName, handleDelete }) => {
   return (
      <ul>
    {persons
    .filter((person) => person.name.toLowerCase().includes(searchedName.toLowerCase()))
    .map(person => 
      <li key={person.id}>{person.name}<span> </span> 
      {person.number}
      <button onClick={handleDelete} value={person.id} name={person.name}>delete</button>
      </li>
      )}
      </ul>
   )
    
}

export default Persons