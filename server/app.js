const mysql = require('mysql2')
const express = require('express')
const app = express()
const userInfo = require('./userInfo')
const connection = mysql.createConnection(userInfo)

app.get('/api/coffees', (req, res, next) => {
  connection.query('SELECT * FROM coffees', (err, results, fields) => {
    const tags = results.map(v => {
      return {
        key: v['tags.key'],
        name: v['tags.name']
      }
    })
    const deletePropertys = results.map(v => {
      delete v['tags.key']
      delete v['tags.name']
      return v
    })
    const result = deletePropertys.map((v, i) => {
      v.tags = tags[i]
      return v
    })
    res.send(result)
  })
})
app.listen(4000, () => {
  console.log('server listen ok')
})
