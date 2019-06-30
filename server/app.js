const mysql = require('mysql2')
const express = require('express')
const app = express()
const userInfo = require('./userInfo')
const connection = mysql.createConnection(userInfo)

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE')
  res.header('Access-Control-Request-Method', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, Secrete_Token'
  )
  next()
})

app.get('/api/tags', (req, res, next) => {
  connection.query('SELECT * FROM tags', (err, result, fields) => {
    res.send(result)
  })
})
app.get('/api/purchase', (req, res, next) => {
  connection.query('SELECT * FROM purchase', (err, result, fields) => {
    res.send(result)
  })
})
app.get('/api/coffees', (req, res, next) => {
  connection.query(
    `SELECT * FROM coffees, tags, purchase 
        WHERE coffees.id = purchase.id AND coffees.id = tags.id`,
    (err, result, fields) => {
      const ADD_PROPERTY = {
        KEYS: 'keys'
      }
      const CHANGE_PROPERTY = {
        KEY: 'key',
        NAME: 'name'
      }
      const propertysInsert = result.map(v => {
        v[ADD_PROPERTY.KEYS] = {
          key: v[CHANGE_PROPERTY.KEY],
          name: v[CHANGE_PROPERTY.NAME]
        }
        return v
      })
      const propertysDelete = propertysInsert.map(v => {
        delete v[CHANGE_PROPERTY.KEY]
        delete v[CHANGE_PROPERTY.NAME]
        return v
      })
      res.send(propertysDelete)
    }
  )
})
app.listen(4000, () => {
  console.log('server listen ok')
})
