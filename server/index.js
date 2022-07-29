const express = require("express");
const mariadb = require("mariadb");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const db = mariadb.createPool({
    user: "root",
    host: "localhost",
    password: "***",
    database: "***",

  });

//apply the json middleware --> that when you send information from the frontend
//we accually pass the json
//app.use(express.json());

//set connection to the database
// db is used to create input, delete like wise all the sql statement in this application



// post --> insrt stuff into a database
//first we have to create route

//api for create user
app.post("/create", async (req, res) => {
    //logic
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const wage = req.body.wage;
    try {
        const result = await db.query(
            "INSERT INTO employees (name, age , country,position,wage) VALUES(?,?,?,?,?)",
            [name, age, country, position, wage]
        );
        res.send("data inserted");
    } catch (err) {
        throw err;
    }
});

//api for send users
app.get("/employees", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM employees");
        res.send(result);
    } catch (err) {
        throw err;
    }
});

app.listen(3001, () => {
    console.log("Server is running");
});
