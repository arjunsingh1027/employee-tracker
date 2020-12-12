const connection = require("./connection");

class DB {
    constructor(connection) {
        this.connection = connection
    };

    // view all employees
    viewAllEmployees() {
        return this.connection.query("SELECT * FROM employee")
    }

    // view all roles
    viewAllRoles() {
        return this.connection.query("SELECT role.id, role.title, role.salary, role.department_id")
    }

    // view departments
    viewAllDepartments() {
        return this.connection.query("SELECT department.id")
    }

    // add employee
    insertEmployee(employee) {
        return this.connection.query("INSERT INTO employee SET ?", employee);
      }

    // add department 
    addNewDepartment() {
        
    }
};

module.exports = DB;