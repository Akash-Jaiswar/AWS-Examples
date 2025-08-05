const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT
const pg = require('pg')
const { Client } = pg


// Initialize PostgreSQL client
const client = new Client({
  // Ensure you configure your database connection details here
  connectionString: process.env.DATABASE_URL, // or other connection details
});

// Connect to PostgreSQL
client.connect().then(() => {
  console.log('Connected to PostgreSQL database');
}).catch(err => {
  console.error('Failed to connect to PostgreSQL database', err);
});

app.use(express.json());

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});


app.get('/questions',async function(req, res) {
  try {
    const result = await client.query('SELECT * FROM questions');
    res.json(result.rows);
  } catch (err) {
    console.log(err)
    res.status(500).send('Failed to retrieve questions');
  }
});

app.put('/submit', function(req, res) {
  console.log('send a post' , req.body);
});

app.get('/style.css', function(req, res) {
  res.sendFile(path.join(__dirname + '/style.css'));
});



app.get('/app.js', function(req, res) {
  res.sendFile(path.join(__dirname + '/app.js'));
});

console.log(`PLANNING TO USE PORT: ${port}`)
app.listen(port, '0.0.0.0', () => console.log(`Listening on port ${port}!`))