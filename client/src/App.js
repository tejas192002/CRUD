import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);

  //to display list of employees
  const [employeeList, setEmployeeList] = useState([]);

  //to pass data to the database
  const addEmployee = () => {
    //create endpoint of the reaquest(endpoint that we wanna make a request)
    Axios.post("http://localhost:3001/create", {
      //body object (we send this body object to the backend)--> that's why we call req.body.name like in backend

      //key: value pair
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage,
    }).then(() => {
      //callback function because this is a promise
      //until our request is done, then ---> do that
      //console.log("success");
      //alert("Successfully added a new employee");
      setEmployeeList([
        ...employeeList,
        {
          name: name,
          age: age,
          country: country,
          position: position,
          wage: wage,
        },
      ]);
    });
  };

  //to get the information from the database
  const getEmployees = () => {
    //create endpoint of the reaquest(endpoint that we wanna make a request)
    Axios.get("http://localhost:3001/employees", {}).then((response) => {
      //callback function because this is a promise
      //until our request is done, then ---> do that

      //convert the values that we received from the backend into the list
      setEmployeeList(response.data);
    });
  };

  return (
      <div className="App">
        <div className="Information">
          <lable>Name:</lable>
          <input
              type="text"
              onChange={(event) => {
                setName(event.target.value);
              }}
          />
          <lable>Age:</lable>
          <input
              type="number"
              onChange={(event) => {
                setAge(event.target.value);
              }}
          />
          <lable>Country:</lable>
          <input
              type="text"
              onChange={(event) => {
                setCountry(event.target.value);
              }}
          />
          <lable>Position:</lable>
          <input
              type="text"
              onChange={(event) => {
                setPosition(event.target.value);
              }}
          />
          <lable>Wage (year):</lable>
          <input
              type="number"
              onChange={(event) => {
                setWage(event.target.value);
              }}
          />
          <button onClick={addEmployee}>Add Employee</button>
        </div>
        <div className="employees">
          <button onClick={getEmployees}>Show Employees</button>
          {employeeList.map((val, key) => {
            return (
                <div className="employee">
                  <h3>Name: {val.name}</h3>
                  <h3>Age: {val.age}</h3>
                  <h3>Country: {val.country}</h3>
                  <h3>Position: {val.position}</h3>
                  <h3>Wage: {val.wage}</h3>
                </div>
            );
          })}
        </div>
      </div>
  );
}

export default App;
