const inquirer = require('inquirer');
const db = require('./db/connection');


const promptUser = () => {
  console.log (`
  ======================
  Please make a selection
  =======================
  `);
    return inquirer.prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'What would you like to view',
      choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role']
    }
  ])
  .then(promptData => {
      if (promptData.choice === 'View All Departments') {
        viewAllDepartments();
      }
      if (promptData.choice === 'View All Roles') {
        viewAllRoles();
      }
      if (promptData.choice === 'View All Employees') {
        viewAllEmployees();
      }
      if (promptData.choice === 'Add A Department') {
        addDepartment();
      }
      
  })
  };


  const viewAllDepartments = () => {
   const sql = `SELECT * FROM department;`; 
  db.query(sql, (err, res) => {
      if (err) {
          throw err;
      }
      console.log('')
      
      console.table(res);
  })
  promptUser();
};


const viewAllRoles = () => {
    const sql = `SELECT role.id, role.title, role.salary, department.name
              AS department_name
              FROM role
              LEFT JOIN department
              ON role.department_id = department.id;`;
    db.query(sql, (err, res) => {
      if (err) {
        throw err;
      }
      console.log('')
      console.table(res);
    })
    promptUser();
};


const viewAllEmployees = () => {
  const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title AS job_title, department.name AS department, role.salary, employee.manger_id
        FROM employee
        LEFT JOIN role ON role.id = employee.role_id
        LEFT JOIN department ON department.id = role.department_id
        UNION
        SELECT CONCAT (employee.first_name, employee.last_name) FROM employee WHERE employee.id = employee.manager_id;`;
        db.query(sql, (err, res) => {
          if (err) {
            throw err;
          }
          console.log('')
          console.table(res);
        })
        promptUser();
    };

  
    const addDepartment = () => {
    console.log(`
    ===============
    Add A Department
    ===============
    `);
    return inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Please enter the name of the new department'  
      }
    ])
    .then(body => {
      const sql = `INSERT INTO department (name) VALUES (?)`;
      const params = [body.name];

      db.query(sql, params, (err, res) => {
        if (err) {
          throw err;
        }
        console.log(`

        Success! ${body.name} has been added.
        
        `);

      })
      promptUser();
    })
  };
        

  const addRole = () => {
    return inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Please enter the role title'  
      },
      {
        type: 'input',
        name: 'salary',
        message: 'Please enter the salary'  
      },
      {
        type: 'input',
        name: 'department',
        message: 'Please enter department id'  
      }
    ])
    .then(body => {
      const sql = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`;
      const params = [body.title, body.salary, body.department];

      db.query(sql, params, (err, res) =>{
        if (err) {
          throw err;
        }
        console.log(`
        
        Success! ${body.title} has been added.
        
        `);
      })
    })
  };

  const addEmployee = () => {

  }

  const updateEmployee = () => {
  
  }


  
  
  promptUser();