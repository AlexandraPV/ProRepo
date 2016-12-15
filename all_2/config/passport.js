
var LocalStrategy   = require('passport-local').Strategy;
var mongoose = require('mongoose');
const mongodb = require('promised-mongo');

var User  = require('../app/models/user');
const url = 'mongodb://localhost:27017/magaz';
const db = mongodb(url);
var count = Math.floor(Math.random() * (70 - 60 + 1) + 60);

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy({

        usernameField : 'email',
        passwordField : 'password',

        passReqToCallback : true
    },
    function(req, email, password, done) {

        process.nextTick(function() {

        User.findOne({ 'local.email' :  email }, function(err, user) {

            if (err)
                return done(err);

            if (user) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {

                var newUser = new User();
                var ava = req.files.avatar;
              var base64String = ava.data.toString('base64');

                newUser.identef=count;
                newUser.cart=[];
                newUser.list=[];

                newUser.local.email    = email;
                newUser.local.password = newUser.generateHash(password);

                newUser.local.first_name = req.body.first_name;
                newUser.local.second_name = req.body.second_name;
                newUser.local.login = req.body.login;
                newUser.local.phone = req.body.phone;
                newUser.local.about = req.body.about;
                newUser.local.avatar = base64String;
                newUser.local.role = "user";
                   count++;

                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }
        });
      });
    }));
    passport.use('local-login', new LocalStrategy({

        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password,  done) {

        User.findOne({ 'local.email' :  email }, function(err, user) {

            if (err)
                return done(err);

            if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found.'));

            if (!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

            return done(null, user);
        });
    }));
};
