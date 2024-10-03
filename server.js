    const express = require('express');
    const app = express(); 
    const mysql = require('mysql2');
    const dotenv = require('dotenv');
    const cors = require('cors'); 

    app.use(express.json());
    app.use(cors());
    dotenv.config();

   // connecting to database
    const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Checking for  connection 
db.connect((err) => {
  // If no connection to database
  if(err) return console.log("Error connecting to MYSQL");

  //If connection works successfully
  console.log("Connected to MYSQL as id: ", db.threadId); 
}) 


   // Question 1 goes here
   app.get('/patients', (req, res) => {
    const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';
  
    db.query(query, (error, results) => {
      if (error) {
        console.error('Error retrieving patients:', error);
        res.status(500).send('Error retriving data');
      } else {
        res.status(200).json(results);
      }
    });
  });

   // Question 2 goes here
   app.get('/providers', (req, res) => {
    const query = 'SELECT first_name, last_name, provider_specialty FROM providers';
  
    db.query(query, (error, results) => {
      if (error) {
        console.error('Error retrieving providers:', error);
        res.status(500).send('Error retrieving providers');
      } else {
        res.status(200).json(results);
      }
    });
  });

   // Question 3 goes here
   app.get('/patients', (req, res) => {
    const { first_name } = req.query;
  
    if (!first_name) {
      return res.status(400).send('Please provide your first name');
    }
  
    const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?';
  
    db.query(query, [first_name], (error, results) => {
      if (error) {
        console.error('Error retrieving patients:', error);
        res.status(500).send('Error retrieving patients');
      } else {
        res.status(200).json(results);
      }
    });
  });

   // Question 4 goes here
   app.get('/providers', (req, res) => {
    const { specialty } = req.query;
  
    if (!specialty) {
      return res.status(400).send('Please provide your specialty');
    }
  
    const query = 'SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?';
  
    db.query(query, [specialty], (error, results) => {
      if (error) {
        console.error('Error retrieving providers:', error);
        res.status(500).send('Error retrieving providers');
      } else {
        res.status(200).json(results);
      }
    });
  });
  
   
   // listen to the server
   const PORT = 3000
   app.listen(PORT, () => {
     console.log(`server is runnig on http://localhost:${PORT}`)
   
     console.log('sending message to browser...');
     app.get('/', (req,res) => {
      res.send('Server Started Successfully!')
     });
   
    });








