import db from '../db/connection.js';

async function viewDepartments() {
    try {
        const result = await db.query('SELECT id, name FROM departments');
        if (result.rows.length === 0) {
            console.log('No departments found.');
        }
        else {
            console.log('Departments:');
            result.rows.forEach(department => {
                console.log(`ID: ${department.id}, Name: ${department.name}`);
            });
        }
    }
    catch (err) {
        console.error('Error fetching departments:', err);
    }
}

export default viewDepartments;