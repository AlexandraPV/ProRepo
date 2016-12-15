var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
    identef: Number,
    cart:[String],
    list:[String],

    local            : {
      first_name: String,
      second_name: String,
      login: String,
      email: String,
      password: String,
      phone: String,
      about:String,
      avatar: String,
      href: String,
      role: String
    }
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);
