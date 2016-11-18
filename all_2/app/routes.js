// app/routes.js

const mongodb = require('promised-mongo');
const url = 'mongodb://localhost:27017/magaz';
const db = mongodb(url);


module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
   app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });




    // =====================================
    // LOGIN ===============================

    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

      db.collection('prod').find().skip(2).limit(7)
     .then(sales => {
     res.render('login.ejs',{
       sales:sales
     });
       })
    });


    app.get('/signup', function(req, res) {

      db.collection('prod').find().skip(4).limit(7)
    	.then(sales => {
    	res.render('signup.ejs',{
    		sales:sales
    	});
    		})


    });


    app.get('/update', isLoggedIn, function(req, res) {
      db.collection('prod').find().skip(4).limit(7)
      .then(sales => {
      res.render('update.ejs',{
        sales:sales,
        user : req.user
      });
        })
    });


    app.get('/addtocart',isLoggedIn, (req, res) => {
    	db.collection('prod').find()
    		.then(prods => {
    			db.collection('prod').find().skip(1).limit(7)
    			.then(sales => {

    			res.render('products', {
    				prods: prods,
    				sales:sales,
    				user : req.user
    			});
    				})
    		})
    		//.then(() => res.redirect('/prod'))
    		.catch(err => res.status(500).end(err));

    });

app.get('/products',isLoggedIn, (req, res) => {
	db.collection('prod').find()
		.then(prods => {
			db.collection('prod').find().skip(1).limit(7)
			.then(sales => {

			res.render('products', {
				prods: prods,
				sales:sales,
				user : req.user
			});
				})
		})
		//.then(() => res.redirect('/prod'))
		.catch(err => res.status(500).end(err));

});


    app.get('/profile', isLoggedIn, function(req, res) {
      db.collection('prod').find().skip(4).limit(7)
      .then(sales => {
      res.render('profile.ejs',{
        sales:sales,
        user : req.user
      });
        })

    });


    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/login');
    });
    // app/routes.js
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
    app.post('/login', passport.authenticate('local-login', {
          successRedirect : '/profile', // redirect to the secure profile section
          failureRedirect : '/login', // redirect back to the signup page if there is an error
          failureFlash : true // allow flash messages
      }));


};


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}
