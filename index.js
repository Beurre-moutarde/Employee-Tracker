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

function add() {
    //set up prompts
    inquirer.prompt([
        //first question
        {
            name: "employeeRoleDepartment",
            type: "list",
            message: "What would you like to add?",
            choices: ["Employee", "Role", "Department"]
        }])
        //questions for add
        .then(function (response) {
            switch (response.employeeRoleDepartment) {
                case "Employee":
                    addEmployee();
                    break;
                case "Role":
                    addRole();
                    break;
                case "Department":
                    addDepartment();
                    break;
                default: console.log("Please enter appropriate choice.")
            }
        })
}

function addEmployee() {
    inquirer.prompt([
        {
            name: "first_name",
            type: "input",
            message: "What is the employee's first name?"
        },

        {
            name: "last_name",
            type: "input",
            message: "What is the employee's last name?"
        },
        //link to role table for role id, this will provide department name
        {
            name: "role_id",
            type: "input",
            message: "What is the employee's role ID number?"
        },

        {
            name: "manager_id",
            type: "input",
            message: "What is the manager's ID number?"
        },

        {
            name: "id",
            type: "number",
            message: "What is the employee's id?"
        },
    ])
        //update mysql table and display in console.table
        .then(function (response) {
            console.table(response)
            let query = connection.query("INSERT INTO employee SET ?",
                {
                    first_name: response.first_name,
                    last_name: response.last_name,
                    role_id: response.role_id,
                    manager_id: response.manager_id,
                    id: response.id

                },
                function (err, res) {
                    if (err) throw err
                    console.log(res)
                })
            //values entered above from prompts
            start()
        })
}

function addDepartment() {
    inquirer.prompt([

        {
            name: "id",
            type: "number",
            message: "What is the department ID?"
        },

        {
            name: "name",
            type: "input",
            message: "What is the department name?"
        },
    ])

        .then(function (response) {
            console.table(response)
            let query = connection.query("INSERT INTO department SET ?",
                {
                    id: response.id,
                    name: response.name,

                },
                function (err, res) {
                    if (err) throw err
                    console.log(res)
                })

            start()
        })
}

function addRole() {
    inquirer.prompt([
        {
            name: "id",
            type: "number",
            message: "What is the role ID?"
        },

        {
            name: "title",
            type: "input",
            message: "What is the role title?"
        },

        {
            name: "salary",
            type: "number",
            message: "What is the role salary?"
        },

        {
            name: "department_id",
            type: "number",
            message: "What is the department ID number?"
        }
    ])
        .then(function (response) {
            console.table(response)
            //enter mysql code here
            let query = connection.query("INSERT INTO role SET ?",
                {
                    ID: response.id,
                    title: response.title,
                    salary: response.salary,
                    department_id: response.department_id
                },
                function (err, res) {
                    if (err) throw err
                    console.log(res)
                })

            start()
        })
}
function view() {
    inquirer.prompt([
        {
            name: "choiceView",
            type: "list",
            message: "What would you like to view?",
            choices: ["All Employees", "All Departments", "All Roles"]
        }]).then(function (response) {
            switch (response.choiceView) {

                case "All Employees":
                    employee();
                    break;
                case "All Departments":
                    department();
                    break;
                case "All Roles":
                    role();
                    break;
                default: console.log("Please enter appropriate choice.")

            }
        })
}
//attempting to join employee and role tables

function employee() {
    let query = "SELECT * FROM employee"

    connection.query(query, function (err, res) {
        console.table(res)
        start()
    })
}

function department() {
    let query = "SELECT * FROM department"
    connection.query(query, function (err, res) {
        console.table(res)
        start()
    })
}

function role() {
    let query = "SELECT * FROM role"
    connection.query(query, function (err, res) {
        console.table(res)
        start()
    })
}

function updateEmployeeRole() {
    connection.query("SELECT id, first_name, last_name from employee", (err, employeeRes) => {
        if (err) throw err;
        // transform the data to be used in inquirer
        const organizedEmployeeData = employeeRes.map(({ id, first_name, last_name }) => `${id}: ${first_name} ${last_name}`)
        connection.query("SELECT id, title from role", (err, roleRes) => {
            if (err) throw err;
            const organizedRoleData = roleRes.map(({ id, title }) => `${id}: ${title}`);
            // evidence collected above
            inquirer.prompt([
                {
                    type: "list",
                    choices: organizedEmployeeData,
                    name: "targetEmp",
                    message: "Whose role needs to change?"
                }, {
                    type: "list",
                    choices: organizedRoleData,
                    name: "targetRole",
                    message: "What is their new role?"
                }
            ]).then(({ targetEmp, targetRole }) => {
                let id = targetEmp.split(":")[0]; 
                let role_ID = targetRole.split(":")[0];
                connection.query("UPDATE employee SET role_ID = ? WHERE id = ?", [role_ID, id], (err, success) => {
                    if (err) throw err;
                    console.log(`Your changes were successful`);
                    process.exit();
                })
            })

        })
    })

}

