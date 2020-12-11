
USE employee_trackerDB;

-- DEPARTMENT SEEDS -----
INSERT INTO department (name)
VALUES 
    ("Sales"), 
    ("Engineering"), 
    ("Finance"), 
    ("Legal");

-- EMPLOYEE ROLE SEEDS -------
INSERT INTO role 
    (title, salary, department_id)
VALUES 
    ("Lead Engineer", 150000, 2),
    ("Legal Team Lead", 250000, 4), 
    ("Accountant", 125000, 3), 
    ("Sales Lead", 100000, 1),
    ("Salesperson", 80000, 1),
    ("Software Engineer", 120000, 2),
    ("Lawyer", 190000, 4);

-- EMPLOYEE SEEDS -------
INSERT INTO employee 
    (first_name, last_name, manager_id, role_id)
VALUES 
    ("Arjun", "Singh", null, 1),
    ("Reade", "Hall", null, 2),
    ("Winston", "Freeman",null,3),
    ("Mark", "Romeo", 1, 4),
    ("Noah", "Kinser", 4, 5),
    ("Jake", "Mottola", 1, 6),
    ("Sean", "Volz", 2, 7);

-- SELECTING FOR CREATING 
--TABLES IN OUR SQL WORKBENCH 
SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;