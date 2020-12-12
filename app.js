const inquirer = require("inquirer");
const connection = require("./db/connection.js");

// initial prompt
function init() {
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
                },
                {
                    name: "View all departments",
                    value: "VIEW_ALL_DEPARTMENTS"
                }
            ]
        }
    ]).then(function ({ choice }) {
        switch (choice) {
            case "VIEW_ALL_EMPLOYEES":
                viewEmployees();
                break;
            case "VIEW_EMPLOYEES_BY_ROLE":
                viewAllRoles();
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
            case "VIEW_ALL_DEPARTMENTS":
                viewDepartments();
                break;
        }
    })
}

// view all employees
function viewEmployees() {
    connection.query("SELECT * FROM employee",
        function (err, res) {
            if (err) throw err
            console.table(res)
            init();
        });
}

// view all roles
function viewAllRoles() {
    connection.query("SELECT * FROM role",
        function (err, res) {
            if (err) throw err
            console.table(res)
            init();
        });
}

// view all departments
function viewDepartments() {
    connection.query("SELECT * FROM department",
        function (err, res) {
            if (err) throw err
            console.table(res)
            init();
        });
}

// add employee
function addEmployee() {
    // const newEmployee = inquirer.prompt([
    //     {
    //         name: "first_name",
    //         message: "What is the employees first name",
    //     },
    //     {
    //         name: "last_name",
    //         message: "What is the employees last name",
    //     },
    //     {
    //         name: "role_id",
    //         message: "What role would you like to give you employee",
    //         type: "list",
    //         choices: roles.map((role) => ({
    //             name: role.title,
    //             value: role.id,
    //         })),
    //     },
    // ]);
    // console.log(newEmployee);
    // init();
}

// add department
function addDepartment() { 

    inquirer.prompt([
        {
          name: "name",
          type: "input",
          message: "What Department would you like to add?"
        }
    ]).then(function(res) {
        var query = connection.query(
            "INSERT INTO department SET ? ",
            {
              name: res.name
            
            },
            function(err) {
                if (err) throw err
                console.table(res);
                init();
            }
        )
    })
  }

init();