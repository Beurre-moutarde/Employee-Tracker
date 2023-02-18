const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
const fs = require('fs');
const inquirer = require('inquirer')

const PORT = process.env.PORT || 3001;
const app = express();

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",
    // Your password
    password: "Crashxv2",
    database: "entreprise_db"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

function start() {
    //set up prompts
    inquirer.prompt([
        //first question
        {
            name: "addViewUpdate",
            type: "list",
            message: "What would you like to do?",
            choices: ["Add", "View", "Update Employee Role"]
        }])
        //if view, show employees, departments or roles table

        .then(function (response) {
            switch (response.addViewUpdate) {
                case "Add":
                    add();
                    break;
                case "View":
                    view();
                    break;
                case "Update Employee Role":
                    updateEmployeeRole();
                    break;
                default: console.log("Please enter appropriate choice.")
            }
        })
}