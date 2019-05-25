const express = require('express');
const mysql = require('mysql');
const app = express();

const keys = require('./keys');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: keys.sqlkey,
  database: 'join_us'
});

app.get('/', (req, res) => {
  const q = 'SELECT COUNT(*) AS count FROM users';
  connection.query(q, (err, results) => {
    if (err) throw err;
    const count = results[0].count;
    res.send('We have ' + count + ' peeps here looks like');
  });
});

app.get('/random', (req, res) => {
  const num = Math.random() * 100;
  res.send(' ' + num);
});

app.listen(3000, () => {
  console.log('Awaiting your orders, sir. We all love and respect you.');
});
