import db from '../db/connection.js';

async function viewRoles() {
    try {
        const result = await db.query(
            `SELECT roles.id, roles.title, roles.salary, departments.name AS department 
            FROM roles 
            JOIN departments ON roles.department_id = departments.id`
        );
        if (result.rows.length === 0) {
            console.log('No roles found.');
        }
        else {
            console.log('Roles:');
            result.rows.forEach(role => {
                console.log(`ID: ${role.id}, Title: ${role.title}, Department: ${role.department}, Salary: $${role.salary}`);
            });
        }
    }
    catch (err) {
        console.error('Error fetching roles:', err);
    }
}

export default viewRoles;