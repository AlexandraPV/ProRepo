var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var prodSchema = mongoose.Schema({
  title: String,
  color: String,
  weight: String,
  guarantee: String,
  description: String,
  price: Number,
  lastprice: Number,
  type:String,
  brand: String,
  comments: [String],
  avatar1: String,
  avatar2: String,
  avatar3: String,
  avatar4: String,
  href: String,

});


module.exports = mongoose.model('Prod', prodSchema);
