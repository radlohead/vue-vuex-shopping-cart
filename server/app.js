const mysql = require('mysql2')
const express = require('express')
const app = express()
const userInfo = require('./userInfo')
const connection = mysql.createConnection(userInfo)

app.get('/api/coffees', (req, res, next) => {
  connection.query('SELECT * FROM coffees', (err, results, fields) => {
    res.send(results)
  })
})
app.listen(4000, () => {
  console.log('server listen ok')
})
