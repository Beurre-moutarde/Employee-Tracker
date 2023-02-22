DROP DATABASE IF EXISTS entreprise_db;
CREATE DATABASE entreprise_db;

USE entreprise_db;

CREATE TABLE department (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE role (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) UNIQUE NOT NULL,
  salary DECIMAL UNSIGNED NOT NULL,
  department_id INT UNSIGNED NOT NULL,
  INDEX dep_ind (department_id),
  CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE employee (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT UNSIGNED NOT NULL,
  INDEX role_ind (role_id),
  CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
  manager_id INT UNSIGNED,
  INDEX man_ind (manager_id),
  CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);


-- -- Create department table
-- CREATE TABLE department (
--   id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
--   name VARCHAR(30)
-- );

-- -- Create role table
-- CREATE TABLE role (
--   id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
--   title VARCHAR(30),
--   salary DECIMAL(10,2),
--   department_id INT,
--   FOREIGN KEY (department_id) REFERENCES department (id)
-- );

-- -- Create employee table
-- CREATE TABLE employee (
--   id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
--   first_name VARCHAR(30),
--   last_name VARCHAR(30),
--   role_id INT,
--   manager_id INT,
--   FOREIGN KEY (role_id) REFERENCES role (id),
--   FOREIGN KEY (manager_id) REFERENCES employee (id)
-- );
