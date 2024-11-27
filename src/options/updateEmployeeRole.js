import inquirer from 'inquirer';
import db from '../db/connection.js';

async function updateEmployeeRole() {
  try {
    const { employeeName } = await inquirer.prompt([
      {
        type: 'list',
        name: 'employeeName',
        message: 'Select the employee whose role you want to update:',
        choices: async () => {
          const result = await db.query('SELECT id, first_name, last_name FROM employees');
          return result.rows.map(emp => `${emp.first_name} ${emp.last_name}`);
        }
      }
    ]);

    const [firstName, lastName] = employeeName.split(' ');

    const employeeResult = await db.query(
      'SELECT id FROM employees WHERE first_name = $1 AND last_name = $2',
      [firstName, lastName]
    );

    if (employeeResult.rows.length === 0) {
      console.log(`No employee found with the name '${employeeName}'.`);
      return;
    }

    const employeeId = employeeResult.rows[0].id;

    const { newRoleTitle } = await inquirer.prompt([
      {
        type: 'list',
        name: 'newRoleTitle',
        message: 'Select the new role for the employee:',
        choices: async () => {
          const result = await db.query('SELECT id, title FROM roles');
          return result.rows.map(role => role.title);
        }
      }
    ]);

    const roleResult = await db.query(
      'SELECT id FROM roles WHERE title = $1;',
      [newRoleTitle]
    );

    if (roleResult.rows.length === 0) {
      console.log(`No role found with the title '${newRoleTitle}'.`);
      return;
    }

    const newRoleId = roleResult.rows[0].id;

    const updateResult = await db.query(
      'UPDATE employees SET role_id = $1 WHERE id = $2 RETURNING id, first_name, last_name, role_id;',
      [newRoleId, employeeId]
    );

    if (updateResult.rows.length > 0) {
      console.log(`Employee '${updateResult.rows[0].first_name} ${updateResult.rows[0].last_name}' role updated to '${newRoleTitle}' successfully!`);
    } else {
      console.log('There was an issue updating the employee\'s role.');
    }
  } catch (err) {
    console.error('Error updating employee role:', err);
  }
}

export default updateEmployeeRole;
