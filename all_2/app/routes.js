
const mongodb = require('promised-mongo');
const url = 'mongodb://localhost:27017/magaz';
const db = mongodb(url);


module.exports = function(app, passport) {

   app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

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
                 search_value: "",
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

         app.get('/brpag*', isLoggedIn, (req, res) => {
               var decrease = req.path;
               decrease = decrease.slice(7);

             db.collection('brands').count()
               .then(count => {
             db.collection('brands').find().skip(0+i*9).limit(9+i*9)
                 .then(prods => {
             db.collection('prod').find().skip(4).limit(7)
                 .then(sales => {

                   res.render('brands', {
                     search_value: "",
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



app.post('/addcomment',isLoggedIn, (req, res) => {
    var title = req.body.prtitle;
    var com = req.body.description;
    var user =req.user;
   db.collection('prod').update({"title": title}, {$push: {"comments": [user.local.login, com]}})
      .then(() => res.redirect('/products'))
      .catch(err => res.status(500).end(err));
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



      app.get('/profile/*',isLoggedIn, (req, res) => {
        var decrease = req.path;
        decrease = decrease.slice(9);
        var uri_dec = decodeURIComponent(decrease);
        db.collection('user').findOne({login: uri_dec})
          .then(userP => {
console.log(userP.identef);
            db.collection('prod').find().skip(5).limit(7)
            .then(sales => {
               if(userP.identef===req.user.identef){

                 res.render('profile',{
                   sales:sales,
                   user : req.user
                 });
               } else {
            res.render('profileUser', {

              userO: userP,
              sales: sales,
              user : req.user
            });
}
      })
          })

          .catch(err => res.status(500).end(err));

        });





      app.get('/brands/*',isLoggedIn, (req, res) => {
        var decrease = req.path;
        decrease = decrease.slice(8);
        var uri_dec = decodeURIComponent(decrease);

        db.collection('brands').findOne({ href: uri_dec})
          .then(prod => {

            db.collection('prod').find().skip(5).limit(7)
            .then(sales => {

            res.render('singlbrand', {

              prod: prod,
              sales: sales,
              user : req.user
            });
            })
          })

          .catch(err => res.status(500).end(err));

        });


app.get('/products',isLoggedIn, (req, res) => {
  var value = req.url;
  if(value.length > 9){
  value = value.slice(12);

    var bar = value.slice(0, 1).toUpperCase() +  value.slice(1);
    bar = new RegExp(bar);
    console.log(value);
           db.collection('prod').find().skip(1).limit(7)
           .then(sales => {

             db.collection('prod').find({title:{'$regex': '.*' + value + '.*', '$options': '$i'}})
               .then(prods => {
                 db.collection('prod').count()
                  .then(count => {
               res.render('products', {
                 prods: prods,
                 sales: sales,
                 user : req.user,
                 count: count
    });
               });
             });
                  })
    .catch(err => res.status(500).end(err));
}else{

	db.collection('prod').find().limit(9)
		.then(prods => {
			db.collection('prod').find().skip(1).limit(7)
			.then(sales => {
        db.collection('prod').count()
         .then(count => {
			res.render('products', {
				prods: prods,
				sales:sales,
        count:count,
				user : req.user
			});
				})
        })
		})

		.catch(err => res.status(500).end(err));
}
});

app.get('/brands',isLoggedIn, (req, res) => {
  var value = req.url;
  if(value.length > 9){
  value = value.slice(12);

    var bar = value.slice(0, 1).toUpperCase() +  value.slice(1);
    bar = new RegExp(bar);
    console.log(value);
           db.collection('prod').find().skip(1).limit(7)
           .then(sales => {

             db.collection('brands').find({name:{'$regex': '.*' + value + '.*', '$options': '$i'}})
               .then(prods => {
                 db.collection('brands').count()
                  .then(count => {
               res.render('brands', {
                 prods: prods,
                 sales: sales,
                 user : req.user,
                 count: count
    });
               });
             });
                  })
    .catch(err => res.status(500).end(err));
}else{

	db.collection('brands').find().limit(9)
		.then(prods => {
			db.collection('prod').find().skip(1).limit(7)
			.then(sales => {
        db.collection('brands').count()
         .then(count => {
			res.render('brands', {
				prods: prods,
				sales:sales,
        count:count,
				user : req.user
			});
				})
        })
		})

		.catch(err => res.status(500).end(err));
}
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

    app.get('/search',isLoggedIn, (req, res) => {

                var value = req.url;
                var list=[];
                value = value.slice(10);
                var bar = value.slice(0, 1).toUpperCase() +  value.slice(1);

                   db.collection('prod').find({title:{'$regex': '.*' + value + '.*', '$options': '$i'}})
                     .then(prods => res.json(prods))
                     .catch(err => res.status(500).end(err));
                });


   app.get('/searchsimpl',isLoggedIn, (req, res) => {

                var value = req.url;
                var value = value.slice(21, -25);
                //var bar = br.slice(0, 24);
console.log(value);
                 db.collection('prod').find().skip(1).limit(7)
                 .then(sales => {

                   db.collection('prod').find({brand:{'$regex': '.*' + value + '.*', '$options': '$i'}})
                     .then(prods => {
                       db.collection('prod').count()
                        .then(count => {
                     res.render('searchsimp', {
                       value: value,
                       prods: prods,
                       sales: sales,
                       user : req.user,
                       count: count
          });
                     });
                   });
                        })
                       .catch(err => res.status(500).end(err));

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



        ////////////////////////////////////////////////////////////////////
        ///////////////////////JSON////////////////////////////////////////








           app.delete('/apiproducts/*', function(req, res, next) {
             var value = req.url;
             value = value.slice(13);
             var bar = value.slice(0, 1).toUpperCase() +  value.slice(1);
         //  var name = req.params.brand_name;
           console.log(bar)
           db.collection('prod').findOne({ 'name': bar})
         .then(prod =>
          db.collection('prod').remove({ 'name': bar})
          .then(del =>
           res.json(prod)))
         .catch(err => res.status(404).json({ error: "ERROR" }));

           });


           app.get('/apiproducts/*', function(req, res, next) {
             var value = req.url;
             value = value.slice(13);
             var bar = value.slice(0, 1).toUpperCase() +  value.slice(1);
           //  var name = req.params.brand_name;
           console.log(bar)
           db.collection('prod').findOne({ 'name': bar})
           .then(prod =>res.json(prod))
           .catch(err => res.status(404).json({ error: "ERROR" }));

           });

           app.post('/apiproducts/*', function(req, res, next) {
             var value = req.url;
             value = value.slice(13);
             var bar = value.slice(0, 1).toUpperCase() +  value.slice(1);
             var space = '/';
             var mas = [];
             mas = bar.split("/");
             var priceI = parseInt(mas[5]);
             var lastpriceI = parseFloat(mas[6]);
             //var mas = [];
             //mas = splitString(bar, space);
           //  var name = req.params.brand_name;
           var hrefProd = mas[0];
           hrefProd = hrefProd.replace(/ /g, '').replace(/\//g, '');
           hrefProd= hrefProd.toLowerCase();
           var hrProd =( '/' + hrefProd);
           console.log(mas)
           db.collection('prod').insert({
             title: mas[0],
 						color: mas[1],
 						weight: mas[2],
 						guarantee: mas[3],
 						description: mas[4],
 						price: priceI,
 						lastprice: lastpriceI,
 						type:mas[7],
 						brand: mas[8],
 						avatar1: 'img1',
 						avatar2: 'img2',
 						avatar3: 'img3',
 						avatar4: 'img4',
 						href: hrefProd
           })
           .then(prod =>res.json(prod))
           .catch(err => res.status(404).json({ error: "ERROR" }));

           });


           app.get('/apiproductsfiltr/*', function(req, res, next) {
             var value = req.url;
             value = value.slice(18);

             var space = '/';
             var mas = [];

             mas = value.split("/");

             if(mas[0] == "title"){

               db.collection('prod').find({title:{'$regex': '.*' + mas[1] + '.*', '$options': '$i'}})
                 .then(prod =>res.json(prod))
                   .catch(err => res.status(404).json({ error: "ERROR" }));
             }
             if(mas[0] == "color"){
               db.collection('prod').find({color:{'$regex': '.*' + mas[1] + '.*', '$options': '$i'}})
                 .then(prod =>res.json(prod))
                   .catch(err => res.status(404).json({ error: "ERROR" }));
             }

             if(mas[0] == "brand"){
               db.collection('prod').find({brand:{'$regex': '.*' + mas[1] + '.*', '$options': '$i'}})
                 .then(prod =>res.json(prod))
                   .catch(err => res.status(404).json({ error: "ERROR" }));
             }
             if(mas[0] == "price"){
               console.log(mas);
               var a = parseInt(mas[2]);
               if(mas[1]=="%3E"){  //>
                 db.collection('prod').find({price: {$gt : a}})
                   .then(prod =>res.json(prod))
                     .catch(err => res.status(404).json({ error: "ERROR" }));
               }
               if(mas[1]=="%3C"){   //<
                 db.collection('brands').find({price: {$lt : a}})
                   .then(prod =>res.json(prod))
                     .catch(err => res.status(404).json({ error: "ERROR" }));
               }
               if(mas[1]=="%3E="){    //>=
                 db.collection('prod').find({price: {$gte : a}})
                   .then(prod =>res.json(prod))
                     .catch(err => res.status(404).json({ error: "ERROR" }));
               }
               if(mas[1]=="%3C="){     //<=
                 db.collection('prod').find({price: {$lte : a}})
                   .then(prod =>res.json(prod))
                     .catch(err => res.status(404).json({ error: "ERROR" }));
               }
               if(mas[1]=="="){     //=
                 db.collection('prod').find({price: a})
                   .then(prod =>res.json(prod))
                     .catch(err => res.status(404).json({ error: "ERROR" }));
               }

             }


           });


           app.post('/apiproductsupdate/*', function(req, res, next) {
             var value = req.url;
             value = value.slice(19);

             var space = '/';
             var mas = [];

             mas = value.split("/");

             if(mas[1] == "title"){

               db.collection('prod').update({title : mas[0]}, {$set: {title : mas[2]}})
                 .then(prod =>res.json(prod))
                   .catch(err => res.status(404).json({ error: "ERROR" }));
             }
             if(mas[1] == "color"){
               db.collection('prod').update({title : mas[0]}, {$set: {color : mas[2]}})
                 .then(prod =>res.json(prod))
                   .catch(err => res.status(404).json({ error: "ERROR" }));
             }
             if(mas[1] == "weight"){
             db.collection('prod').update({title : mas[0]}, {$set: {weight: mas[2]}})
                   .then(prod =>res.json(prod))
                     .catch(err => res.status(404).json({ error: "ERROR" }));
             }
             if(mas[1] == "price"){
               var a = parseInt(mas[2]);
               db.collection('prod').update({title : mas[0]}, {$set: {price : a}})
                     .then(prod =>res.json(prod))
                       .catch(err => res.status(404).json({ error: "ERROR" }));
               }
               if(mas[1] == "price"){
                 var a = parseInt(mas[2]);
                 db.collection('prod').update({title : mas[0]}, {$set: {price : a}})
                       .then(prod =>res.json(prod))
                         .catch(err => res.status(404).json({ error: "ERROR" }));
                 }


           });





                   ///////////////////////JSON////////////////////////////////////////
                   ////////////////////////////////////////////////////////////////////





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
