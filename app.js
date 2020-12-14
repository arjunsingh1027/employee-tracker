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
                    name: "View all departments",
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
                    name: "Exit",
                    value: "EXIT"
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
            case "EXIT":
                process.exit(0);
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

// select role query for add employee prompt
const roleArray = [];
function selectRole() {
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            roleArray.push(res[i].title);
        }
    })
    return roleArray;
}

// add employee
function addEmployee() {
    inquirer.prompt([
        {
            name: "firstName",
            type: "input",
            message: "What is the employee's first name?"
        },
        {
            name: "lastName",
            type: "input",
            message: "What is the employee's last name?"
        },
        {
            name: "role",
            type: "list",
            message: "What is the employee's role?",
            choices: selectRole()
        }
    ]).then(function (val) {
        const roleId = selectRole().indexOf(val.role) + 1
        connection.query("INSERT INTO employee SET ?",
            {
                first_name: val.firstName,
                last_name: val.lastName,
                role_id: roleId
            },
            function (err) {
                if (err) throw err
                console.table(val)
                init();
            })
    })
}

// add department
function addDepartment() {
    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "What Department would you like to add?"
        }
    ]).then(function (res) {
        var query = connection.query(
            "INSERT INTO department SET ? ",
            {
                name: res.name

            },
            function (err) {
                if (err) throw err
                console.table(res);
                init();
            }
        )
    })
}

// add role
function addRole() {
    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "What role would you like to add?"
        },
        {
            name: "salary",
            type: "input",
            message: "What is the salary of this role?"
        }
    ]).then(function (res) {
        connection.query("INSERT INTO role SET ?",
            {
                title: res.name,
                salary: res.salary
            },
            function (err) {
                if (err) throw err
                console.table(res);
                init();
            }
        )
    }
    )
};

// update employee role
function updateInfo() {
    connection.query("SELECT employee.first_name FROM employee JOIN role ON employee.role_id = role.id", function (err, res) {
        if (err) throw err
        console.log(res)
        inquirer.prompt([
            {
                name: "firstName",
                type: "rawlist",
                choices: function () {
                    var firstName = [];
                    for (var i = 0; i < res.length; i++) {
                        firstName.push(res[i].first_name);
                    }
                    return firstName;
                },
                message: "Who is the employee you would like to update?",
            },
            {
                name: "role",
                type: "rawlist",
                message: "what is their new role?",
                choices: selectRole()
            }
        ]).then(function (val) {
            const roleId = selectRole().indexOf(val.role) + 1
            connection.query("UPDATE employee SET WHERE ?",
                {
                    first_name: val.firstName
                },
                {
                    role_id: roleId
                },
                function (err) {
                    if (err) throw err
                    console.table(val)
                    init();
                })
        });
    });
}

init();