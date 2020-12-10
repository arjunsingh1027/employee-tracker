const inquirer = require("inquirer");
const mysql = require("mysql");


// mysql connection
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "employee_trackerdb",
});

connection.connect(function (err) {
    if (err) throw err
    console.log("Connected as Id" + connection.threadId)
    start();
});

// initial prompt
function start() {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "choice",
            choices: [
                "View all employees",
                "View all employees by role",
                "View all employees by department",
                "Update employee information",
                "Add an employee",
                "Add a role",
                "Add a department"
            ]
        }
    ]).then(function (val) {
        switch (val.choice) {
            case "View all employees":
                viewAllEmployees();
                break;
            case "View all employees by role":
                viewEmployeeRolls();
                break;
            case "View all employees by department":
                viewDepartments();
                break;
            case "Update employee information":
                updateInfo();
                break;
            case "Add an employee":
                addEmployee();
                break;
            case "Add a role":
                addRole();
                break;
            case "Add a department":
                addDepartment();
                break;
        }
    })
}

// view all employees

// view all roles

// view employees by departments

// add employee

// update employee

// add role

// add department
