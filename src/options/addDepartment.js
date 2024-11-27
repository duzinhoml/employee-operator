import inquirer from 'inquirer';
import db from '../db/connection.js';

async function addDepartment() {
  try {
    const { departmentName } = await inquirer.prompt([
      {
        type: 'input',
        name: 'departmentName',
        message: 'Enter the name of the new department:',
        validate: (input) => {
          if (!input) {
            return 'Please enter a valid department name.';
          }
          return true;
        }
      }
    ]);

    const result = await db.query(
      'INSERT INTO departments (name) VALUES ($1) RETURNING id, name;',
      [departmentName]
    );

    if (result.rows.length > 0) {
      console.log(`Department '${result.rows[0].name}' added successfully!`);
    } else {
      console.log('There was an issue adding the department.');
    }

  } catch (err) {
    console.error('Error adding department:', err);
  }
}

export default addDepartment;
