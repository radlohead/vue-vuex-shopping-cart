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
    `SELECT * FROM coffees, purchase 
        WHERE coffees.id = purchase.id`,
    (err, coffeeResult, fields) => {
      connection.query(`SELECT * FROM tags`, (err, tagsResult, fields) => {
        const ADD_PROPERTY = {
          KEYS: 'keys',
          STOCK: 'stock'
        }
        const REMOVE_PROPERTY = {
          COUNT: 'count'
        }
        const CHANGE_PROPERTY = {
          KEY: 'key',
          NAME: 'name'
        }
        const result = coffeeResult.map((v, i) => {
          v[ADD_PROPERTY.KEYS] = {
            key: tagsResult[i][CHANGE_PROPERTY.KEY],
            name: tagsResult[i][CHANGE_PROPERTY.NAME]
          }
          v[ADD_PROPERTY.STOCK] = coffeeResult[i][REMOVE_PROPERTY.COUNT]
          delete v[REMOVE_PROPERTY.COUNT]
          return v
        })
        res.send(result)
      })
    }
  )
})
app.listen(4000, () => {
  console.log('server listen ok')
})
