const express = require('express');
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

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
    res.render('home', { count: count });
  });
});

app.post('/register', (req, res) => {
  const person = { email: req.body.email };

  connection.query('INSERT INTO users SET ?', person, (err, results) => {
    if (err) throw err;
    res.redirect('/');
  });
});

app.listen(3000, () => {
  console.log('Awaiting your orders, sir. We all love and respect you.');
});
