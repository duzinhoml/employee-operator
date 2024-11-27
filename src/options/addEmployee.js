import inquirer from 'inquirer';
import db from '../db/connection.js';

async function addEmployee() {
  try {
    const { firstName, lastName, roleTitle, managerName } = await inquirer.prompt([
      {
        type: 'input',
        name: 'firstName',
        message: 'Enter the first name of the employee:',
        validate: (input) => {
          if (!input) {
            return 'Please enter a valid first name.';
          }
          return true;
        }
      },
      {
        type: 'input',
        name: 'lastName',
        message: 'Enter the last name of the employee:',
        validate: (input) => {
          if (!input) {
            return 'Please enter a valid last name.';
          }
          return true;
        }
      },
      {
        type: 'input',
        name: 'roleTitle',
        message: 'Enter the role title of the employee:',
        validate: (input) => {
          if (!input) {
            return 'Please enter a valid role title.';
          }
          return true;
        }
      },
      {
        type: 'input',
        name: 'managerName',
        message: `Enter the manager's name (leave blank if no manager):`,
        default: ''
      }
    ]);

    const roleResult = await db.query(
      'SELECT id FROM roles WHERE title = $1;',
      [roleTitle]
    );

    if (roleResult.rows.length === 0) {
      console.log(`No role found with the title '${roleTitle}'.`);
      return;
    }

    const roleId = roleResult.rows[0].id;

    let managerId = null;
    if (managerName) {
      const managerResult = await db.query(
        'SELECT id FROM employees WHERE CONCAT(first_name, \' \', last_name) = $1;',
        [managerName]
      );

      if (managerResult.rows.length === 0) {
        console.log(`No manager found with the name '${managerName}'.`);
        return;
      }

      managerId = managerResult.rows[0].id;
    }

    const result = await db.query(
      'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING id, first_name, last_name, role_id, manager_id;',
      [firstName, lastName, roleId, managerId]
    );

    if (result.rows.length > 0) {
      console.log(`Employee '${result.rows[0].first_name} ${result.rows[0].last_name}' added successfully!`);
    } else {
      console.log('There was an issue adding the employee.');
    }
  } catch (err) {
    console.error('Error adding employee:', err);
  }
}

export default addEmployee;
