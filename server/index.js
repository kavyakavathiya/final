const dotenv = require(`dotenv`)
dotenv.config()
const express = require('express')
const app = express()
const mysql = require('mysql2')
const cors = require('cors')
const bodyParser = require('body-parser')
const db = mysql.createPool({
host: process.env.MYHOST,
user: process.env.MYUSERNAME,
password: process.env.PASSWORD,
database: process.env.DATABASE,

});

console.log(`--------------heyyy-----------${process.env.MYHOST}`);
console.log(`--------------heyyy-----------${process.env.MYUSERNAME}`);
console.log(`--------------heyyy-----------${process.env.PASSWORD}`);
const port_backend = process.env.PORTBACKEND
const port_frontend = process.env.PORTFRONTEND
 console.log(db)
 const corsOptions = {
  credentials: true,
  origin: '*',
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
};

app.use(cors(corsOptions));



app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))
db.query('CREATE DATABASE IF NOT EXISTS myapp', (err, result) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Database created or already exists');
    db.query(
      `CREATE TABLE IF NOT EXISTS myapp.customer (
        user_id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        contact VARCHAR(255) NOT NULL,
        city VARCHAR(255) NOT NULL,
        age INT NOT NULL
      )`,
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log('Table created or already exists');
        }
      }
    );
  }
});
// ---------------------------------------display details start--------------------------------------
app.get('/api/displayDeetails', (req, res) => {
  const sqlSelect = 'SELECT * FROM customer';
  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      if (result.length > 0) {
        res.json(result);
      } else {
        res.json([]);
      }
    }
  });
});

app.get('/api/healthcheck', (req, res) => {
  console.log("Success")
  res.send("success")
});

 
// ---------------------------------------display details end--------------------------------------

// ---------------------------------------Add details start--------------------------------------
app.post(`/api/addDetails`, (req, res)=>{
 
    const name = req.body.name
    const email = req.body.email
    const contact = req.body.contact
    const city = req.body.city
    const age = req.body.age
    const sqlinsert=`INSERT INTO customer (name, email, contact, city, age) VALUES (?, ?, ?, ?, ?)`;    
    db.query(sqlinsert, [name,email,contact,city,age], (err, result)=>{
        console.log(err);
        res.send("success")
    });
});
// ---------------------------------------Add details end--------------------------------------

// ---------------------------------------Update details start--------------------------------------


app.get('/api/selectOneUserDetails/:id', (req, res) => {
  const id = req.params.id; // Get the customer ID from the request URL parameter

  // Retrieve existing data for the customer ID
  const sqlSelect = 'SELECT * FROM customer WHERE user_id = ?';
  db.query(sqlSelect, [id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error retrieving customer details');
    } else {
      if (result.length > 0) {
        const customerData = result[0]; // Assuming only one record is retrieved
        res.status(200).send(customerData); // Send the customer data as the response
      } else {
        res.status(404).send('Customer not found');
      }
    }
  });
});


app.put('/api/updateDetails/:id', (req, res) => {
  const id = req.params.id; // Get the customer ID from the request URL parameter
  const { name, email, contact, city, age } = req.body; // Get the updated details from the request body

  // Update the customer details in the database
  const sqlUpdate = 'UPDATE customer SET name=?, email=?, contact=?, city=?, age=? WHERE user_id=?';
  db.query(sqlUpdate, [name, email, contact, city, age, id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error updating customer details');
    } else {
      console.log(result);
      res.status(200).json({ status: 'success' }); // Send a JSON response with the status 'success'
    }
  });
});


  
// ---------------------------------------Update details end--------------------------------------

// ---------------------------------------Delete details start--------------------------------------



app.delete('/api/deleteDetails/:id', (req, res) => {
  const id = req.params.id; // Get the customer ID from the request URL parameter

  const sqlDelete = 'DELETE FROM customer WHERE user_id = ?';
  db.query(sqlDelete, [id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error deleting customer');
    } else {
      console.log(result);
      res.status(200).send('success');
    }
  });
});

  


// ---------------------------------------Delete details end--------------------------------------

 
app.listen(port_backend, () => {
console.log(`running on port ${port_backend}`);
});
