// get the client
const mysql = require('mysql2');
const dotenv = require("dotenv").config();

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER, 
  database: 'groupomania',
  password: process.env.DB_PASS
});

 
module.exports = pool.promise( console.log("Connexion BDD"));





pool.query(`SELECT * FROM user `,
function(err,results,fields){
  console.log(results);
 
});


pool.query(`SELECT * FROM post `,
function(err,results,fields){
  console.log(results);
 
});
pool.query(`SELECT * FROM comment `,
function(err,results,fields){
  console.log(results);
 
});

