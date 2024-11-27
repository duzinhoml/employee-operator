-- Add in some template data

-- Insert Departments
INSERT INTO departments (name)
VALUES
  ('Engineering'),
  ('Marketing'),
  ('Human Resources'),
  ('Sales'),
  ('Finance');

-- Insert Roles
INSERT INTO roles (title, salary, department_id)
VALUES
  ('Software Engineer', 90000.00, 1),
  ('Marketing Manager', 75000.00, 2),
  ('HR Specialist', 60000.00, 3),
  ('Product Manager', 95000.00, 1),
  ('UX Designer', 70000.00, 1);

-- Insert Employees
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ('John', 'Doe', 1, NULL),
  ('Jane', 'Smith', 2, NULL),
  ('Alice', 'Johnson', 3, 2),
  ('Bob', 'Brown', 4, 1),
  ('Charlie', 'Davis', 5, 1),
  ('Eva', 'Williams', 1, 1);