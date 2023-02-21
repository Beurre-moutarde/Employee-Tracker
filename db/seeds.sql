-- Departments
INSERT INTO department (, name) VALUES
  ('Sales'),
  ('Engineering'),
  ('Marketing'),
  ('Finance');

-- Roles
INSERT INTO role (title, salary, department_id) VALUES
  ('Salesperson', 50000, 1),
  ('Sales Manager', 70000, 1),
  ('Software Engineer', 90000, 2),
  ('Lead Software Engineer', 120000, 2),
  ('Marketing Coordinator', 45000, 3),
  ('Marketing Manager', 80000, 3),
  ('Accountant', 60000, 4),
  ('Financial Analyst', 75000, 4);

-- Employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
  ('John', 'Doe', 1, NULL),
  ('Jane', 'Smith', 2, 1),
  ('Bob', 'Johnson', 3, 2),
  ('Lisa', 'Williams', 4, 2),
  ('Mike', 'Brown', 5, 3),
  ('Sarah', 'Jones', 6, 3),
  ('Tom', 'Wilson', 7, 4),
  ('Karen', 'Taylor', 8, 4);
