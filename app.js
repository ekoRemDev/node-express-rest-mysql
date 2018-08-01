// Todo 1- We'll use express Library
const express = require('express');
// Todo 2- we create an instance of express
const app = express();
// Todo 5- we'll use MySql
const mysql = require('mysql');



// Todo 4- Route
app.get('/', (req, res) => {
    res.send('Main Page');
});


// Todo 6- Mysql Connection
// database sql file is in project folder
function getMySqlConnection() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        pass: '',
        database: 'node_express_rest_mysql'
    })
};

// Todo-7 Mysql CRUD Operations

const connection = getMySqlConnection();

// List all data from mysql database
app.get('/list/', (req, res) => {
    const queryList = "SELECT * FROM members";
    connection.query(queryList, function (err, rows, field) {
        if (err) {
            console.log('there is error : ' + err)
            res.end();
        }
        res.json(rows);

    });
});

// Create new data in table
app.get('/create/', (req, res) => {
    // we use static data at the moment, after some implementations we ll get data from form
    let nameValue = "member name";
    let surnameValue = "member surname";
    let instrumentsValue = "member instruments";

    const queryInsert = "INSERT INTO members (name,surname,instruments) VALUES (?,?,?)";

    connection.query(queryInsert,[nameValue,surnameValue,instrumentsValue],(err, results,field)=>{
        if(err){
            console.log('Error Occured :' + err.message);
            res.sendStatus(500);
            return
        }

        console.log("New Data Inserted Into Table");
        res.redirect('/list');
        res.end();
    });
});

//Read data from table based on /id
app.get('/read/:id', (req, res) => {
    res.send('Read');
});

// Update data based on /id
app.get('/update/:id', (req, res) => {
    res.send('Update');
});

// Delete data based on /id
app.get('/delete/:id', (req, res) => {
    res.send('delete');
});


// Todo 3- We create server and run it
app.listen(3000, () => {
    console.log('Server is up and running on Port 3000');
});
