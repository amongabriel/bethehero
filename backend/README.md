#### Modules ####

Express: It's a framework for API development for nodejs

Nodemon: Comiles and restarts the nodejs server automatically each time the code is changed

knex: query builder for nodejs

knex migrations: database schema history with all chages 


#### Commands ####

MySQL pass: amon1513

How to see the MySQL default pass:

# grep 'A temporary password is generated' /var/log/mysqld.log | tail -1

Creating a new node backend project

# npm init -y

Creating a new React project (Facebook pattern)

# npx create-react-app frontend		// The npx is a utility module like npm, however, instead of installing a package it executes it once dispensing the installation

# npx knex init						// To init the knex config

Creating migrations 

# npx knex migrate:make create_ongs // To create a new migration

# npx knex migrate:latest           // To execute to the last migrantion

# npx knex migrate:rollback         // To rollback the last migration