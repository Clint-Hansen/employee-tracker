const inquirer = require('inquirer');
const db = require('./db/connection');


const promptUser = () => {
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
  })
  };

  const viewAllDepartments = () => {
   const sql = `SELECT * FROM department;`; 
  db.query(sql, (err, res) => {
      if (err) {
          throw err;
      }
      console.table(res);
  })
  
}
  
  
  promptUser();