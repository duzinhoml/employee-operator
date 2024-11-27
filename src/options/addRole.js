import inquirer from 'inquirer';
import db from '../db/connection.js';

async function addRole() {
  try {
    const { roleName, roleSalary, departmentName } = await inquirer.prompt([
      {
        type: 'input',
        name: 'roleName',
        message: 'Enter the name of the new role:',
        validate: (input) => {
          if (!input) {
            return 'Please enter a valid role name.';
          }
          return true;
        }
      },
      {
        type: 'input',
        name: 'roleSalary',
        message: 'Enter the salary for this role (00000.00):',
        validate: (input) => {
          if (isNaN(input) || parseFloat(input) <= 0) {
            return 'Please enter a valid salary (greater than 0).';
          }
          return true;
        }
      },
      {
        type: 'input',
        name: 'departmentName',
        message: 'Enter the name of the department this role belongs to:',
        validate: (input) => {
          if (!input) {
            return 'Please enter a valid department name.';
          }
          return true;
        }
      }
    ]);

    const departmentResult = await db.query(
      'SELECT id FROM departments WHERE name = $1;',
      [departmentName]
    );

    if (departmentResult.rows.length === 0) {
      console.log(`No department found with the name '${departmentName}'.`);
      return;
    }

    const departmentId = departmentResult.rows[0].id;

    const result = await db.query(
      'INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3) RETURNING id, title, salary, department_id;',
      [roleName, roleSalary, departmentId]
    );

    if (result.rows.length > 0) {
      console.log(`Role '${result.rows[0].title}' added successfully to the department '${departmentName}'!`);
    } else {
      console.log('There was an issue adding the role.');
    }
  } catch (err) {
    console.error('Error adding role:', err);
  }
}

export default addRole;
