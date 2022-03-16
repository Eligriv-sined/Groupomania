
const { log } = require('console');
const mysql = require('mysql2');
const dotenv = require("dotenv").config();


const pool = mysql.createPool({  
  host: process.env.DB_HOST,
  user: process.env.DB_USER, 
  password: process.env.DB_PASS,
  database: 'groupomania',
});

console.log(pool);

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


