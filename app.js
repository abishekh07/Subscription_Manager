const mysql = require('mysql')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'abi777!!',
  database: 'cards'
})

app.get('/', (req, response) => {
  db.query(
    'SELECT name, role FROM users ORDER BY created_at DESC',
    (err, results) => {
      if (err) err
      response.render('home', { results: results })
    }
  )
})

app.post('/signup', (req, res) => {
  const user = {
    name: req.body.name,
    role: req.body.role
  }

  db.query('INSERT INTO users SET ?', user, (err, res) => {
    if (err) throw err
    console.log(`New user registered:- ${user.name}`)
  })
  res.redirect('/')
})

app.post('/', (req, res) => {
  const key = Object.keys(req.body)
  db.query(`DELETE FROM users WHERE name = '${key}'`, (err, result) => {
    if (err) throw err
    console.log(`User Deleted:- ${key}`)
  })
  res.redirect('/')
})

app.listen(3000, () => {
  console.log('Server is up and running on Port 3000')
})
