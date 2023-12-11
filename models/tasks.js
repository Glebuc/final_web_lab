const { Schema, model } = require('mongoose')

const schema = new Schema({
  title: String,
  descript: String
})

module.exports = model('task', schema)
