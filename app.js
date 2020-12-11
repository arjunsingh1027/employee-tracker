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
                {
                    name: "View all employees",
                    value: "VIEW_ALL_EMPLOYEES"
                },
                {
                    name: "View all employees by role",
                    value: "VIEW_EMPLOYEES_BY_ROLE"
                },
                {
                    name: "View all employees by department",
                    value: "VIEW_EMPLOYEES_BY_DEPARTMENT"
                },
                {
                    name: "Update employee information",
                    value: "UPDATE_EMPLOYEE_INFO"
                },
                {
                    name: "Add an employee",
                    value: "ADD_EMPLOYEE"
                },
                {
                    name: "Add a role",
                    value: "ADD_ROLE"
                },
                {
                    name: "Add a department",
                    value: "ADD_DEPARTMENT"
                }
            ]
        }
    ]).then(function (choice) {
        switch (choice) {
            case "VIEW_ALL_EMPLOYEES":
                viewAllEmployees();
                break;
            case "VIEW_EMPLOYEES_BY_ROLE":
                viewEmployeeRolls();
                break;
            case "VIEW_EMPLOYEES_BY_DEPARTMENT":
                viewDepartments();
                break;
            case "UPDATE_EMPLOYEE_INFO":
                updateInfo();
                break;
            case "ADD_EMPLOYEE":
                addEmployee();
                break;
            case "ADD_ROLE":
                addRole();
                break;
            case "ADD_DEPARTMENT":
                addDepartment();
                break;
        }
    })
}

// view all employees
function viewAllEmployees() {
    connection.query("SELECT * FROM employee",
        function (err, res) {
            if (err) throw err
            console.table(res)
            start();
        });
}

// view all roles
function viewEmployeeRolls() {
    connection.query("SELECT * FROM role",
        function (err, res) {
            if (err) throw err
            console.table(res)
            start();
        });
}

// view employees by departments
function viewDepartments() {

}

// add employee

// update employee

// add role

// add department
