import axios from "axios";
import personService from "./services/persons";
import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [searchedName, setSearch] = useState("");
  const [successMessage, setSuccessMessage] = useState('phonebook was successfully updated.')

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNum = (event) => {
    setNewNum(event.target.value);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleDelete = (event) => {
    const id = event.target.value;
    const name = event.target.name;
    deletePerson(id, name);
  };

  const handleNew = (event) => {
    event.preventDefault();
    //check if already registered
    if (persons.some((person) => person.name === newName)) {
      if (!window.confirm(`${newName} is already added to phonebook, replace the old number to a new one?`))
      {
        //cancel modification
        setNewName("");
        setNewNum("");
      return
      }
      else
      {
          //replace new number
          const person = persons.find(person => person.name === newName)
          const updatedPerson = { name: person.name, number: newNum };
          personService
            .updatePerson(updatedPerson, person)
            .then(() => {
              updateList(setPersons)
              setNewName("");
              setNewNum("");
            })
            .catch(error => {
              setSuccessMessage(
                `Information of ${person} has already been removed from the server.`
              )
              setTimeout(() => {
                setSuccessMessage(null)}, 5000)
              })
            }
      }
    else
    {
          //add new person
          const newPerson = { name: newName, number: newNum };
          personService.create(newPerson).then((response) => {
            setPersons(persons.concat(response.data));
            setNewName("");
            setNewNum("");
            setSuccessMessage(
              `Successfully added ${newName}`
            )
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
          });
    }
  
  };

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)){
      personService
      .deletePerson(id, persons)
      .then((response) => {
        updateList(setPersons)
      }); 
    }
    };

    const updateList = (setPersons) => {
      const request = axios.get('http://localhost:3001/persons');
      request.then(response => {
        const persons = response.data;
        setPersons(persons)
      })
    } 

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage}/>
      <Filter searchedName={searchedName} handleSearch={handleSearch} />
      <h3>Add a new</h3>
      <PersonForm
        formSubmit={handleNew}
        newName={newName}
        formNewName={handleNewName}
        newNum={newNum}
        formNewNum={handleNewNum}
      />

      <h3>Numbers</h3>

      <Persons
        persons={persons}
        searchedName={searchedName}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
