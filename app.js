var express = require('express')
var bodyParser = require('body-parser')
var router = require('./router')

var app = express()

app.use('/public/', express.static('./public/'))
app.use('/node_modules/', express.static('./node_modules/'))

// 必须装这个 才能使用res.render()
app.engine('html', require('express-art-template'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(router)

app.listen(3000, () => {
  console.log("running...")
})