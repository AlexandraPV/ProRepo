var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var brandSchema = mongoose.Schema({
  name: String,
  founder: String,
  date: String,
  staf: Number,
  cost: Number,
  avatar1: String,
  href: String

});



module.exports = mongoose.model('Brand', brandSchema);
