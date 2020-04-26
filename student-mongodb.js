const mongoose = require('mongoose');

var Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/students');

var userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
    },
    age: {
      type: String
    },
    hobbies: {
      type: String,
    }
})

module.exports = mongoose.model('Student', userSchema);