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








    app.get('/products/*',isLoggedIn, (req, res) => {
    	var decrease = req.path;
      decrease = decrease.slice(10);
      var uri_dec = decodeURIComponent(decrease);

    	db.collection('prod').findOne({ href: uri_dec})
    		.then(prod => {
    			db.collection('prod').find().skip(5).limit(7)
    			.then(sales => {

    			res.render('prod', {
    				prod: prod,
            sales: sales,

            user : req.user
    			});
    			})

    		})

    		.catch(err => res.status(500).end(err));

      });


      app.get('/propag*', isLoggedIn, (req, res) => {
        var decrease = req.path;
        decrease = decrease.slice(7);
        var i = parseInt(decrease);
      db.collection('prod').count()
        .then(count => {
      db.collection('prod').find().skip(0+i*9).limit(9+i*9)
          .then(prods => {
      db.collection('prod').find().skip(4).limit(7)
          .then(sales => {

            res.render('products', {
              sales: sales,
              count: count,
              prods: prods,
              href_add:'addprod',
              user : req.user
            //	user : req.user
            });
            })
          })
          .catch(err => res.status(500).end(err));
        });

      });




app.get('/products',isLoggedIn, (req, res) => {
	db.collection('prod').find().limit(9)
		.then(prods => {
			db.collection('prod').find().skip(1).limit(7)
			.then(sales => {
        db.collection('prod').count()
          .then(count => {
			res.render('products', {
				prods: prods,
				sales:sales,
        count: count,
				user : req.user
			});
				})
        	})
		})

		.catch(err => res.status(500).end(err));

});




app.get('/phones',isLoggedIn, (req, res) => {
	db.collection('prod').find({"type":"phon"})
		.then(prods => {
			db.collection('prod').find().skip(1).limit(7)
			.then(sales => {

			res.render('categori', {
				prods: prods,
				sales:sales,
        user : req.user
			});
				})
		})
		.catch(err => res.status(500).end(err));

});


app.get('/comp',isLoggedIn, (req, res) => {
	db.collection('prod').find({"type":"comp"})
		.then(prods => {
			db.collection('prod').find().skip(1).limit(7)
			.then(sales => {

			res.render('categori', {
				prods: prods,
				sales:sales,
        user : req.user
			});
				})
		})
		.catch(err => res.status(500).end(err));

});

app.get('/home',isLoggedIn, (req, res) => {
	db.collection('prod').find({"type":"home"})
		.then(prods => {
			db.collection('prod').find().skip(1).limit(7)
			.then(sales => {

			res.render('categori', {
				prods: prods,
				sales:sales,
        user : req.user
			});
				})
		})
		.catch(err => res.status(500).end(err));

});

app.get('/book',isLoggedIn, (req, res) => {
	db.collection('prod').find({"type":"book"})
		.then(prods => {
			db.collection('prod').find().skip(1).limit(7)
			.then(sales => {

			res.render('categori', {
				prods: prods,
				sales:sales,
        user : req.user
			});
				})
		})
		.catch(err => res.status(500).end(err));

});


app.get('/applhome',isLoggedIn, (req, res) => {
	db.collection('prod').find({"type":"applhome"})
		.then(prods => {
			db.collection('prod').find().skip(1).limit(7)
			.then(sales => {

			res.render('categori', {
				prods: prods,
				sales:sales,
        user : req.user
			});
				})
		})
		.catch(err => res.status(500).end(err));

});

app.get('/cloth',isLoggedIn, (req, res) => {
	db.collection('prod').find({"type":"cloth"})
		.then(prods => {
			db.collection('prod').find().skip(1).limit(7)
			.then(sales => {

			res.render('categori', {
				prods: prods,
				sales:sales,
        user : req.user
			});
				})
		})
		.catch(err => res.status(500).end(err));

});



   app.get('/cart',isLoggedIn, (req, res) => {
    var user = req.user;
    var cart = user.cart;
     var mas=[];

    console.log(cart);
    db.collection('prod').find().skip(1).limit(7)
    .then(sales => {

      db.collection('prod').find()
        .then(prods => {
          for (var i=0; i<cart.length; i++) {
            for (var j=0; j<prods.length; j++){
              if (cart[i]==prods[j].title){
                mas.push(prods[j]);
                console.log("elem" + cart[i]);
                break;
          }
          }
        }
        res.render('cart', {
          prods: mas,
          sales:sales,
          user : req.user
        });
      });
   				})
          .catch(err => res.status(500).end(err));

   		});






      app.get('/list',isLoggedIn, (req, res) => {
       var user = req.user;
       var list = user.list;
        var mas=[];

       db.collection('prod').find().skip(1).limit(7)
       .then(sales => {

         db.collection('prod').find()
           .then(prods => {
             for (var i=0; i<list.length; i++) {
               for (var j=0; j<prods.length; j++){
                 if (list[i]==prods[j].title){
                   mas.push(prods[j]);
                   console.log("elem" + list[i]);
                   break;
             }
             }
           }
           res.render('list', {
             prods: mas,
             sales:sales,
             user : req.user
           });
         });


      				})
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






     ////////////////////////////////////////////////////////////////////
     ///////////////////////JSON////////////////////////////////////////




     		app.get('/jsonphones', (req, res) => {
     			db.collection('prod').find({"type":"phon"})
     				.then(prod => res.json(prod))
     				/*	db.collection('prod').find().skip(1).limit(7)
     					.then(sales => res.json(sales))*/
     					.catch(err => res.status(404).json({ error: err }));

     		});

        app.get('/jsoncomp', (req, res) => {
          db.collection('prod').find({"type":"comp"})
            .then(prod => res.json(prod))
            /*	db.collection('prod').find().skip(1).limit(7)
              .then(sales => res.json(sales))*/
              .catch(err => res.status(404).json({ error: err }));

        });

        app.get('/jsonhome', (req, res) => {
          db.collection('prod').find({"type":"home"})
            .then(prod => res.json(prod))
            /*	db.collection('prod').find().skip(1).limit(7)
              .then(sales => res.json(sales))*/
              .catch(err => res.status(404).json({ error: err }));

        });

        app.get('/jsonbook', (req, res) => {
          db.collection('prod').find({"type":"book"})
            .then(prod => res.json(prod))
            /*	db.collection('prod').find().skip(1).limit(7)
              .then(sales => res.json(sales))*/
              .catch(err => res.status(404).json({ error: err }));

        });

        app.get('/jsonapplhome', (req, res) => {
          db.collection('prod').find({"type":"applhome"})
            .then(prod => res.json(prod))
            /*	db.collection('prod').find().skip(1).limit(7)
              .then(sales => res.json(sales))*/
              .catch(err => res.status(404).json({ error: err }));

        });

        app.get('/jsonapplcloth', (req, res) => {
          db.collection('prod').find({"type":"applcloth"})
            .then(prod => res.json(prod))
            /*	db.collection('prod').find().skip(1).limit(7)
              .then(sales => res.json(sales))*/
              .catch(err => res.status(404).json({ error: err }));

        });

      app.get('/jsonprofile', isLoggedIn, function(req, res) {
        var  user = req.user;
          if (!user){
      			res.json({'error':'need login'})
      		}
      	else{	db.collection('users').find({"identef": parseInt(user.identef)})
      			 .then(users => res.json(users))
           }
        });

      app.get('/jsonproducts',isLoggedIn, (req, res) => {
        	db.collection('prod').find()
            .then(prod => res.json(prod))
            /*	db.collection('prod').find().skip(1).limit(7)
              .then(sales => res.json(sales))*/
              .catch(err => res.status(404).json({ error: err }));
        		})


    app.get('/jsoncart',isLoggedIn, (req, res) => {
             var user = req.user;
             var cart = user.cart;
              var mas=[]
             console.log(cart);

               db.collection('prod').find()
                 .then(prods => {
                   for (var i=0; i<cart.length; i++) {
                     for (var j=0; j<prods.length; j++){
                       if (cart[i]==prods[j].title){
                         mas.push(prods[j]);
                         console.log("elem" + cart[i]);
                         break;
                   }
                   }
                 }res.json(mas)

            				/*	db.collection('prod').find().skip(1).limit(7)
            					.then(sales => res.json(sales))*/
            					.catch(err => res.status(404).json({ error: err }));
               });


               });




     ///////////////////////JSON////////////////////////////////////////
     ////////////////////////////////////////////////////////////////////


     app.get('/jsonlist',isLoggedIn, (req, res) => {
      var user = req.user;
      var list = user.list;
       var mas=[]

        db.collection('prod').find()
          .then(prods => {
            for (var i=0; i<list.length; i++) {
              for (var j=0; j<prods.length; j++){
                if (list[i]==prods[j].title){
                  mas.push(prods[j]);
                  console.log("elem" + list[i]);
                  break;
            }
            }
          }res.json(mas)

             /*	db.collection('prod').find().skip(1).limit(7)
               .then(sales => res.json(sales))*/
               .catch(err => res.status(404).json({ error: err }));
        });


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
