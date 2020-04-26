var express = require('express')
var bodyParser = require('body-parser')

var Student = require('./student-mongodb')

var router = express.Router()

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', (req, res) => {
  Student.find((err, students) => {
    if (err) return res.status(500).send('Server error')
    res.render('index.html', {
      db: students
    })
  })
})

router.get('/views/addstu', (req, res) => {
  res.render('addstu.html')
})

router.post('/views/addstu', (req, res) => {
  new Student(req.body).save(err => {
    if (err) return res.status(500).send('Server error')
    res.redirect('/')
  })
  // Student.save(req.body, err => {
  //   if (err) return res.status(500).send('Server error')
  //   res.redirect('/')
  // })
})

router.get('/views/modifystu', (req, res) => {
  Student.findById(req.query.id, (err, student) => {
    if (err) return res.status(500).send('Server error')
    res.render('modifystu.html', {
      student: student
    })
  })
})

router.post('/views/modifystu', (req, res) => {
  Student.findByIdAndUpdate(req.body.id, req.body, err => {
    if (err) return res.status(500).send('Server error')
    res.redirect('/')
  })
})

router.get('/views/deletestu', (req, res) => {
  Student.findByIdAndRemove(req.query.id, err => {
    if (err) return res.status(500).send('Server error')
    res.redirect('/')
  })
})

module.exports = router