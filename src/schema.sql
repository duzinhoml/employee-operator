DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

\c company_db;

CREATE TABLE departments (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL
);

CREATE TABLE roles (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    department_id INT REFERENCES departments(id)
);

CREATE TABLE employees (
    id BIGSERIAL PRIMARY KEY,
    first_name VARCHAR(150) NOT NULL,
    last_name VARCHAR(150) NOT NULL,
    role_id INT REFERENCES roles(id),
    manager_id INT REFERENCES employees(id)
);
