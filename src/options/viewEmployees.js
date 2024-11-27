import db from '../db/connection.js';

async function viewEmployees() {
    try {
        const result = await db.query(
            `SELECT 
  e.id AS employee_id,
  e.first_name,
  e.last_name,
  r.title AS role,
  d.name AS department,
  r.salary,
  CONCAT(m.first_name, ' ', m.last_name) AS manager
FROM employees e
JOIN roles r ON e.role_id = r.id
JOIN departments d ON r.department_id = d.id
LEFT JOIN employees m ON e.manager_id = m.id;
`);
        if (result.rows.length === 0) {
            console.log('No employees found.');
        }
        else {
            console.log('Employees:');
            result.rows.forEach(employee => {
                console.log(`ID: ${employee.employee_id}, Name: ${employee.first_name} ${employee.last_name}, Role: ${employee.role}, Department: ${employee.department}, Salary: $${employee.salary}, Manager: ${employee.manager || 'N/A'}`);
            });
        }
    }
    catch (err) {
        console.error('Error fetching employees:', err);
    }
}

export default viewEmployees;