const mysql = require("mysql");
const init = require("../app")

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "employee_trackerdb",
});

connection.connect(function (err) {
    if (err) throw err
    console.log("Connected as Id" + connection.threadId)
});

module.exports = connection;