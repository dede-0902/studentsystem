var fs = require('fs')

var dbPath = './db.json'

// 获取所有学生的列表
exports.find = function(callback) {
  fs.readFile(dbPath, (err, data) => {
    if (err) return callback(err)
    callback(null, JSON.parse(data.toString()).students)
  })
}

// 添加保存學生
exports.save = function(student, callback) {
  fs.readFile(dbPath, (err, data) => {
    if (err) return callback(err)
    var students = JSON.parse(data.toString()).students
    student.id = parseInt(students[students.length-1].id) + 1
    students.push(student)
    var fileData = JSON.stringify({students: students})
    fs.writeFile(dbPath, fileData, err => {
      if (err) return callback(err)
      callback(null)
    })
  })
}

// 根据id查找到学生
exports.findById = function(id, callback) {
  fs.readFile(dbPath, (err, data) => {
    if (err) return callback(err)
    var students = JSON.parse(data.toString()).students
    var student = students.find(item => {return item.id == id})
    callback(null, student)
  })
}

// 更新学生信息
exports.updateById = function(student, callback) {
  fs.readFile(dbPath, (err, data) => {
    if (err) return callback(err)
    var students = JSON.parse(data.toString()).students
    var stu = students.find(item => {return item.id == student.id})
    for(var key in student) {
      stu[key] = student[key]
    }
    var fileData = JSON.stringify({students: students})
    fs.writeFile(dbPath, fileData, err => {
      if (err) return callback(err)
      callback(null)
    })
  })
}

// 删除学生信息
exports.delete = function(id, callback) {
  fs.readFile(dbPath, (err, data) => {
    if (err) return callback(err)
    var students = JSON.parse(data.toString()).students
    var deleteId = students.findIndex(item => {return item.id == id})
    students.splice(deleteId, 1)
    var fileData = JSON.stringify({students: students})
    fs.writeFile(dbPath, fileData, err => {
      if (err) return callback(err)
      callback(null)
    })
  })
}