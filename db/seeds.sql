INSERT INTO department (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 1),
    ('Salesperson', 60000, 1),
    ('Lead Engineer', 150000, 2),
    ('Lawyer', 190000, 4),
    ('Accountant', 90000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('James', 'Fraser', 1, NULL),
  ('Jack', 'London', 2, 1),
  ('Robert', 'Bruce', 2, 1),
  ('Peter', 'Greenaway', 3, NULL),
  ('Derek', 'Jarman', 4, 4);


 