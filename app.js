// Todo 1- We'll use express Library
const express = require('express');
// Todo 2- we create an instance of express
const app = express();
// Todo 5- we'll use MySql
const mysql = require('mysql');
// Todo 8- We will use filesystem
const fs = require('fs');


// Todo 4- Route
app.get('/', (req, res) => {
    // res.send('Main Page');
    fs.readFile('message.html',(err,html)=>{
        res.writeHeader(200, {"Content-Type": "text/html"});
        res.write(html);
        res.end();
    });
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
    connection.query(queryInsert, [nameValue, surnameValue, instrumentsValue], (err, results, field) => {
        if (err) {
            console.log('Error Occured :' + err.message);
            res.sendStatus(500);
            return
        }

        console.log("New Data Inserted Into Table");
        res.redirect('/list');
        res.end();
    });
});

//Read data from table based on given /id
app.get('/read/:id', (req, res) => {
    let memberID = req.params.id;
    const querySelect = "SELECT * FROM members WHERE id = ?";
    connection.query(querySelect, [memberID], (err, rows, field) => {
        if (err) {
            console.log('Error Occured : ' + err.message);
            res.sendStatus(500);
            return
        }
        if (rows.length === 0) {
            res.send('Oooppps No Data Related id : ' + memberID);
        } else {
            console.log('Selected data is shown');
            res.json(rows);
        }
    });
});

// Update data based on given /id
app.get('/update/:id', (req, res) => {
    let memberID = req.params.id;
    const querySelect = "SELECT * FROM members WHERE id = ?";
    connection.query(querySelect, [memberID], (err, rows, field) => {
        if (err) {
            console.log('Error Occured : ' + err.message);
            res.sendStatus(500);
            return
        }
        if (rows.length === 0) {
            res.send('Oooppps No Data Related id : ' + memberID);
        } else {
            console.log('Selected data is shown');

            let oldName = rows[0].name;
            let oldSurname = rows[0].surname;
            let oldInstruments = rows[0].instruments;
            console.log(oldName + " " + oldSurname + " - " + oldInstruments);

            res.json(rows);
        }
    });

    // we use static data at the moment we'll add form and then get value from form
    let newName = "New Name";
    let newSurname = "New Surname";
    let newInstruments = "New Instruments";
    let newId = 6;
    // end of static data

    const queryUpdate = "UPDATE members SET name = ?, surname=?, instruments=? WHERE id=?";
    connection.query(queryUpdate, [newName, newSurname, newInstruments, newId], (err, rows, field) => {
        if (err) {
            console.log('Error Occured : ' + err.message);
            res.sendStatus(500);
            return
        }
        if (rows.length === 0) {
            res.send('Oooppps No Data Related id : ' + memberID);
        } else {
            console.log('Selected data is updated');
        }
    });


    /*
     Todo ? after operation it has to show new set of data
     instead of selecting and updating values, we can use Just sql UPDATE syntax
      */


});

// Delete data based on given /id
app.get('/delete/:id', (req, res) => {
    let memberID = req.params.id;
    const querySelect = "DELETE FROM members WHERE id = ?";
    connection.query(querySelect, [memberID], (err, rows, field) => {
        if (err) {
            console.log('Error Occured : ' + err.message);
            res.sendStatus(500);
            return
        }
        if (rows.length === 0) {
            res.send('Oooppps No Data Related id : ' + memberID);
        } else {
            console.log('Selected data is Deleted');
            res.send(memberID + ' is DELETED');
        }
    });
});

// Not Found Route
app.get('*',(req,res)=>{
    res.send('What Is Wrong With You!')
});


// Todo 3- We create server and run it
app.listen(3000, () => {
    console.log('Server is up and running on Port 3000');
});
