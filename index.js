const inquirer = require('inquirer');
const db = require('./db/connection');


const promptUser = () => {
  console.clear();
    return inquirer.prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'Please make a selection',
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
      if (promptData.choice === 'Add A Role') {
        addRole();
      }
      if (promptData.choice === 'Add An Employee') {
        addEmployee();
      }
      if (promptData.choice === 'Update An Employee Role') {
        updateEmployee();
      }
      
  })
  };


  const viewAllDepartments = () => {
   const sql = `SELECT * FROM department;`; 
  db.query(sql, (err, res) => {
      if (err) {
          throw err;
      }
      console.clear();
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
      console.clear();
      console.log('')
      console.table(res);
    })
    promptUser();
};


const viewAllEmployees = () => {
  const sql = `SELECT employee2.id, employee2.first_name, employee2.last_name, role.title job_title, department.name department, role.salary,
  (SELECT manager_name FROM (
      SELECT employee.id, CONCAT(employee.first_name, ' ', employee.last_name) AS manager_name
      FROM employee
      WHERE employee.manager_id IS NULL
      ) name
  WHERE id = employee2.manager_id ) manager_name
  FROM employee employee2
  JOIN role ON role.id = employee2.role_id
  JOIN department ON department.id = role.department_id;`;
        db.query(sql, (err, res) => {
          if (err) {
            throw err;
          }
          console.clear();
          console.log('')
          console.table(res);
        })
        promptUser();
    };

  
    const addDepartment = () => {
    console.log(`
    ================
    Add A Department
    ================
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
        console.clear();
        console.log(`

        Success! ${body.name} has been added.
        
        `);

      })
      promptUser();
    })
  };
        

  const addRole = () => {
    console.log(`
    ===========
    Add A Role
    ===========
    `);
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

      db.query(sql, params, (err, res) => {
        if (err) {
          throw err;
        }
        console.clear();
        console.log(`
        
        Success! ${body.title} has been added.
        
        `);
      })
      promptUser();
    })
  };

  const addEmployee = () => {
    console.log(`
    ===============
    Add An Employee
    ===============
    `);
    return inquirer.prompt([
      {
        type: 'input',
        name: 'first_name',
        message: "Please enter the employee's first name" 
      },
      {
        type: 'input',
        name: 'last_name',
        message: "Please enter the employee's last name"  
      },
      {
        type: 'input',
        name: 'role_id',
        message: 'Please enter the role id of the employee'  
      },
      {
        type: 'input',
        name: 'manager_id',
        message: "Please enter the employee manager's id"
      }
    ])
    .then(body => {
      const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
      const params = [body.first_name, body.last_name, body.role_id, body.manager_id];

      db.query(sql, params, (err, res) => {
        if (err) {
          throw err;
        }
        console.clear();
        console.log(`
        
        Success! ${body.first_name} ${body.last_name} has been added.
        
        `);
      })
      promptUser();
    })
  }

  const updateEmployee = () => {
    console.log(`
    ===============
    Update Employee
    ===============
    `);
    return inquirer.prompt([
      {
        type: 'input',
        name: 'id',
        message: 'Please enter the employee id'  
      },
      {
        type: 'input',
        name: 'roleID',
        message: 'Please enter the role id'  
      }
    ])
    .then(body => {
      const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
      const params = [body.roleID, body.id];

      db.query(sql, params, (err, res) =>{
        if (err) {
          throw err;
        }
        console.clear();
        console.log(`
        
        Success! Employee role has been updated.
        
        `);
      })
      promptUser();
    })
  }

promptUser();