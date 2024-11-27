import inquirer from 'inquirer';
import viewDepartments from './options/viewDepartments.js';
import viewRoles from './options/viewRoles.js';
import viewEmployees from './options/viewEmployees.js';
import addDepartment from './options/addDepartment.js';
import addRole from './options/addRole.js';
import addEmployee from './options/addEmployee.js';
import updateEmployeeRole from './options/updateEmployeeRole.js';

async function startCli() {
    const {starterOptions} = await inquirer
        .prompt(
            {
                type: "list",
                name: "starterOptions",
                message: "What would you like to do?",
                choices: ['View all departments', 
                          'View all roles', 
                          'View all employees',
                          'Add a department',
                          'Add a role',
                          'Add an employee',
                          'Update an employee role',
                          'Exit'
                        ],
            }
        );

        console.log('You selected:', starterOptions);

        switch(starterOptions) {
            case 'View all departments':
                console.log('Loading departments...');
                await viewDepartments();
                break;
            case 'View all roles':
                console.log('Loading roles...');
                await viewRoles();
                break;
            case 'View all employees':
                console.log('Loading employees...')
                await viewEmployees();
                break;
            case 'Add a department':
                await addDepartment();
                break;
            case 'Add a role':
                await addRole();
                break;
            case 'Add an employee':
                await addEmployee();
                break;
            case 'Update an employee role':
                await updateEmployeeRole();
                break;
            case 'Exit':
                console.log('See ya!');
                process.exit();
            default:
                console.log('Invalid option');
        }
};

startCli();