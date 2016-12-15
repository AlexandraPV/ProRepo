
const mongodb = require('promised-mongo');
const url = 'mongodb://alisandra:maugli98lisik@ds127958.mlab.com:27958/magaz';
//const db = mongodb(url);
var mongoose = require('mongoose');

var User = require('../app/models/user');
var Brand  = require('../app/models/brand');
var Prod  = require('../app/models/prod');
module.exports = function(app, passport) {

app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
});

app.get('/login', function(req, res) {

      Prod.find().skip(2).limit(7)
     .then(sales => {
     res.render('login.ejs',{
       sales:sales
     });
       })
});

app.get('/signup', function(req, res) {

      Prod.find().skip(4).limit(7)
    	.then(sales => {
    	res.render('signup.ejs',{
    		sales:sales
    	});
    		})
});

app.get('/update', isLoggedIn, function(req, res) {
      Prod.find().skip(4).limit(7)
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
         Prod.count()
           .then(count => {
         Prod.find().skip(0+i*9).limit(9+i*9)
             .then(prods => {
         Prod.find().skip(4).limit(7)
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

             Brand.count()
               .then(count => {
             Brand.find().skip(0+i*9).limit(9+i*9)
                 .then(prods => {
             Prod.find().skip(4).limit(7)
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
   Prod.update({"title": title}, {$push: {"comments": [user.local.login, com]}})
      .then(() => res.redirect('/products'))
      .catch(err => res.status(500).end(err));
});

app.get('/products/*',isLoggedIn, (req, res) => {
    	var decrease = req.path;
      decrease = decrease.slice(10);
      var uri_dec = decodeURIComponent(decrease);

    	Prod.findOne({ href: uri_dec})
    		.then(prod => {

    			Prod.find().skip(5).limit(7)
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
       console.log(uri_dec);

        User.findOne({'local.login': uri_dec})
        .then(docs => {
       var us1 = docs.identef;
       //var us1p = parseInt(us1);
       var us2 = req.user.identef;
       //var us2p = parseInt(us2);
       console.log(docs);
       console.log("us2" + us2);
            Prod.find().skip(5).limit(7)
            .then(sales => {

                 res.render('profileUser',{
                   sales:sales,
                   user : req.user,
                   users: docs
                 });
                   })

   })
          .catch(err => res.status(500).end(err));
});

app.get('/brands/*',isLoggedIn, (req, res) => {
        var decrease = req.path;
        decrease = decrease.slice(8);
        var uri_dec = decodeURIComponent(decrease);

        Brand.findOne({ href: uri_dec})
          .then(prod => {

            Prod.find().skip(5).limit(7)
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
                 Prod.find().skip(1).limit(7)
                 .then(sales => {

                   Prod.find({title:{'$regex': '.*' + value + '.*', '$options': '$i'}})
                     .then(prods => {
                       Prod.count()
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

      	Prod.find().limit(9)
      		.then(prods => {
      			Prod.find().skip(1).limit(7)
      			.then(sales => {
              Prod.count()
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
                   Prod.find().skip(1).limit(7)
                   .then(sales => {

                     Brand.find({name:{'$regex': '.*' + value + '.*', '$options': '$i'}})
                       .then(prods => {
                         Brand.count()
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

        	Brand.find().limit(9)
        		.then(prods => {
        			Prod.find().skip(1).limit(7)
        			.then(sales => {
                Brand.count()
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
    	Prod.find({"type":"phon"})
    		.then(prods => {
    			Prod.find().skip(1).limit(7)
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
	Prod.find({"type":"comp"})
		.then(prods => {
			Prod.find().skip(1).limit(7)
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
	Prod.find({"type":"home"})
		.then(prods => {
			Prod.find().skip(1).limit(7)
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
	Prod.find({"type":"book"})
		.then(prods => {
			Prod.find().skip(1).limit(7)
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
	Prod.find({"type":"applhome"})
		.then(prods => {
			Prod.find().skip(1).limit(7)
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
	Prod.find({"type":"cloth"})
		.then(prods => {
			Prod.find().skip(1).limit(7)
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
    Prod.find().skip(1).limit(7)
    .then(sales => {

      Prod.find()
        .then(prods => {
          for (var i=0; i<cart.length; i++) {
            for (var j=0; j<prods.length; j++){
              if (cart[i]==prods[j].href){
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

       Prod.find().skip(1).limit(7)
       .then(sales => {

         Prod.find()
           .then(prods => {
             for (var i=0; i<list.length; i++) {
               for (var j=0; j<prods.length; j++){
                 if (list[i]==prods[j].href){
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
      Prod.find().skip(4).limit(7)
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

                   Prod.find({title:{'$regex': '.*' + value + '.*', '$options': '$i'}})
                     .then(prods => res.json(prods))
                     .catch(err => res.status(500).end(err));
});

app.get('/searchsimpl',isLoggedIn, (req, res) => {

                var value = req.url;
                var value = value.slice(21, -25);
                //var bar = br.slice(0, 24);
                console.log(value);
                 Prod.find().skip(1).limit(7)
                 .then(sales => {

                   Prod.find({brand:{'$regex': '.*' + value + '.*', '$options': '$i'}})
                     .then(prods => {
                       Prod.count()
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

app.get('/searchwind',isLoggedIn, (req, res) => {
                  var value = req.url;

                  value = value.slice(14);
                  console.log(value);

                              Prod.find().skip(1).limit(7)
                              .then(sales => {

                                Prod.find({brand:{'$regex': '.*' + value + '.*', '$options': '$i'}})
                                  .then(prods => {
                                    Prod.count()
                                     .then(count => {
                                  res.render('search', {
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


///
app.get('/add', (req, res) => {
			Prod.find().skip(5).limit(7)
			.then(sales => {
			res.render('add',{
				sales:sales
			});
				})
});

app.get('/rules', (req, res) => {
		Prod.find().skip(5).limit(7)
		.then(sales => {
		res.render('contacts',{
			sales:sales
		});
			})
});

app.get('/addbrand', (req, res) => {
		Prod.find().skip(5).limit(7)
		.then(sales => {
		res.render('addbrand',{
			sales:sales
		});
			})
});

app.post('/addtocart', isLoggedIn,  (req, res) => {
	var title = req.body.prtitle;
  var id= req.body.prid;
	console.log(id);
	User.find({"identef": parseInt(id)})
	.then(users => {
		console.log(users);
				User.update({"identef": parseInt(id)}, {$push: {"cart": title}});
		})
		.then(() => res.redirect('/products'))
		.catch(err => res.status(500).end(err));

});

app.post('/addtolist', isLoggedIn,  (req, res) => {
		var title = req.body.prtitle;
	  var id= req.body.prid;
		console.log(id);
		User.find({"identef": parseInt(id)})
		.then(users => {
			console.log(users);
					User.update({"identef": parseInt(id)}, {$push: {"list": title}});
			})
			.then(() => res.redirect('/products'))
			.catch(err => res.status(500).end(err));

});

app.post('/deleteprod', isLoggedIn,  (req, res) => {
			var name = req.body.prtitle;
		  var id= req.body.prid;

			User.find({"identef": parseInt(id)})
			.then(users => {

						Prod.remove({"title": name});
				})
				.then(() => res.redirect('/products'))
				.catch(err => res.status(500).end(err));

});

app.post('/update', isLoggedIn, (req, res) => {
			var first_name = req.body.first_name;
			var second_name = req.body.second_name;
			var login = req.body.login;
			var email = req.body.email;
			var phone = req.body.phone;
			var about = req.body.about;

			var id = req.body.prid;
			console.log(first_name);
			User.findOne({"identef": parseInt(id)})
			.then(users => {
					console.log(users);
          User.findOne({"identef": parseInt(id)}, function (err, doc){
      doc.local.first_name = first_name;
      doc.local.second_name=second_name;
      doc.local.login=login;
      doc.local.email=email;
      doc.local.phone=phone;
      doc.local.about=about;


      doc.save();
    });

				})

				.then(() => res.redirect('/profile'))
				.catch(err => res.status(500).end(err));

});

app.post('/addphoto', isLoggedIn, (req, res) => {

      var avaFile = req.files.avatar;
      var base64String = avaFile.data.toString('base64');
			var id = req.body.prid;

			User.findOne({"identef": parseInt(id)})
			.then(users => {
					console.log(users);
          User.findOne({"identef": parseInt(id)}, function (err, doc){
      doc.local.avatar = base64String;

      doc.save();
    });

				})

				.then(() => res.redirect('/profile'))
				.catch(err => res.status(500).end(err));

});

app.delete('/deletefromlist*',isLoggedIn,  (req, res) => {

    var value = req.url;
    value = value.slice(24);
    //var bar = value.slice(0, 1).toUpperCase() +  value.slice(1);
       //  var name = req.params.brand_name;
     console.log(value);

     id=req.user.identef;

              User.update({"identef": parseInt(id)}, {$pull: {"list": {$in:[value]}}})
              .then(del =>res.json({ error: "NONE" }))
              .catch(err => res.status(404).json({ error: "ERROR" }));
  });


app.post('/deletecom',isLoggedIn,  (req, res) => {
					var num = req.body.prtitle;
					var id= req.body.prid;
					var log = req.body.prlog;
					var com = req.body.prcom;
	        var i = parseInt(num);
		Prod.findOne({href: id})
		.then(prod => {
			console.log(prod.brand);

		Prod.update({href: id}, {$pull:{"comments" : [log, com]}})
						.then(() => res.redirect('/products'))
						.catch(err => res.status(500).end(err));
		});
});

app.delete('/deletefromcart*', isLoggedIn,  (req, res) => {
  var value = req.url;
  value = value.slice(24);
  //var bar = value.slice(0, 1).toUpperCase() +  value.slice(1);
     //  var name = req.params.brand_name;
   console.log(value);

   id=req.user.identef;

						User.update({"identef": parseInt(id)}, {$pull: {"cart": {$in:[value]}}})
            .then(del =>res.json({ error: "NONE" }))
            .catch(err => res.status(404).json({ error: "ERROR" }));
});

app.post('/add', isLoggedIn, (req, res) => {
	var title = req.body.title;
	var color = req.body.color;
	var weight = req.body.weight;
	var guarantee = req.body.guarantee;
	var description = req.body.description;
	var lastprice = req.body.lastprice;
	var price = req.body.price;
	var type = req.body.type;
	var brand = req.body.brand;
	var admEmail = req.body.email;
	var admpass = req.body.password;
	var avaFile1 = req.files.avatar1;
	var avaFile2 = req.files.avatar2;
	var avaFile3 = req.files.avatar3;
	var avaFile4 = req.files.avatar4;
	var hrefProd = req.body.title;

	hrefProd = hrefProd.replace(/ /g, '').replace(/\//g, '');
	hrefProd= hrefProd.toLowerCase();
	var hrProd =( '/' + hrefProd);

	var base64String1 = avaFile1.data.toString('base64');
	var base64String2 = avaFile2.data.toString('base64');
	var base64String3 = avaFile3.data.toString('base64');
	var base64String4 = avaFile4.data.toString('base64');
	if (!title || !color || !brand || !price || !lastprice || !type || !weight || !description || !guarantee || !avaFile1 || !avaFile2 || !avaFile3 || !avaFile4) res.status(400).end('not ok');
	else {
		Prod.findOne({ title: title})
			.then(prod => {
				if (prod) res.status(200).end('prod exists');
				else {


					return Prod.insert({
						title: title,
						color: color,
						weight: weight,
						guarantee: guarantee,
						description: description,
						price: price,
						lastprice: lastprice,
						type:type,
						brand: brand,
						comments: [],
						avatar1: base64String1,
						avatar2: base64String2,
						avatar3: base64String3,
						avatar4: base64String4,
						href: hrefProd,

					});
				}
			})
			.then(() => res.redirect('/products'))
			.catch(err => res.status(500).end(err));
	}
});

app.post('/addbrand', isLoggedIn, (req, res) => {
	var name = req.body.name;
	var founder = req.body.founder;
	var date = req.body.date;
	var staf = req.body.staf;
	var cost = req.body.cost;
	var avaFile1 = req.files.avatar1;

	var hrefProd = req.body.name;
  var stafI = parseInt(staf);
  var costI = parseFloat(cost);
	hrefProd = hrefProd.replace(/ /g, '').replace(/\//g, '');
	hrefProd= hrefProd.toLowerCase();
	var hrProd =( '/' + hrefProd);

	var base64String1 = avaFile1.data.toString('base64');

	if (!name || !founder || !date || !staf || !cost || !avaFile1 ) res.status(400).end('not ok');
	else {
		Brand.findOne({ name: name})
			.then(prod => {
				if (prod) res.status(200).end('brand exists');
				else {

					return Brand.insert({
						name: name,
						founder: founder,
						date: date,
						staf: stafI,
						cost: costI,
						avatar1: base64String1,

						href: hrefProd
					});
				}
			})
			.then(() => res.redirect('/brands'))
			.catch(err => res.status(500).end(err));
	}
});

app.post('/deleteprod',isLoggedIn, (req, res) => {
	var title = req.body.prtitle;
  var id= req.body.prid;

	User.find({"identef": parseInt(id)})
	.then(users => {

				Prod.remove({"title": title});
		})
		.then(() => res.redirect('/products'))
		.catch(err => res.status(500).end(err));

});

app.get('/userslist',isLoggedIn, (req, res) => {
  User.find().limit(9)
    .then(prods => {
      Prod.find().skip(1).limit(7)
      .then(sales => {
        Prod.count()
          .then(count => {
      res.render('userslist', {
        prods: prods,
        sales: sales,
        count: count,
        user : req.user
      });
        })
          })
    })

    .catch(err => res.status(500).end(err));

});

////////////////////////////////////////////////////////////////////
///////////////////////JSON////////////////////////////////////////


app.get('/jsonphones', (req, res) => {
     			Prod.find({"type":"phon"})
     				.then(prod => res.json(prod))
     				/*	Prod.find().skip(1).limit(7)
     					.then(sales => res.json(sales))*/
     					.catch(err => res.status(404).json({ error: err }));

});

app.get('/jsoncomp', (req, res) => {
          Prod.find({"type":"comp"})
            .then(prod => res.json(prod))
            /*	Prod.find().skip(1).limit(7)
              .then(sales => res.json(sales))*/
              .catch(err => res.status(404).json({ error: err }));

});

app.get('/jsonhome', (req, res) => {
          Prod.find({"type":"home"})
            .then(prod => res.json(prod))
            /*	Prod.find().skip(1).limit(7)
              .then(sales => res.json(sales))*/
              .catch(err => res.status(404).json({ error: err }));

});

app.get('/jsonbook', (req, res) => {
          Prod.find({"type":"book"})
            .then(prod => res.json(prod))
            /*	Prod.find().skip(1).limit(7)
              .then(sales => res.json(sales))*/
              .catch(err => res.status(404).json({ error: err }));

});

app.get('/jsonapplhome', (req, res) => {
        Prod.find({"type":"applhome"})
            .then(prod => res.json(prod))
            /*	Prod.find().skip(1).limit(7)
              .then(sales => res.json(sales))*/
              .catch(err => res.status(404).json({ error: err }));
});

app.get('/jsonapplcloth', (req, res) => {
          Prod.find({"type":"applcloth"})
            .then(prod => res.json(prod))
            /*	Prod.find().skip(1).limit(7)
              .then(sales => res.json(sales))*/
              .catch(err => res.status(404).json({ error: err }));
});

app.get('/jsonprofile', isLoggedIn, function(req, res) {
        var  user = req.user;
          if (!user){
      			res.json({'error':'need login'})
      		}
      	else{	User.find({"identef": parseInt(user.identef)})
      			 .then(users => res.json(users))
           }
});

app.get('/jsonproducts',isLoggedIn, (req, res) => {
        	Prod.find()
            .then(prod => res.json(prod))
            /*	Prod.find().skip(1).limit(7)
              .then(sales => res.json(sales))*/
              .catch(err => res.status(404).json({ error: err }));
})

app.get('/jsoncart',isLoggedIn, (req, res) => {
             var user = req.user;
             var cart = user.cart;
              var mas=[]
             console.log(cart);

               Prod.find()
                 .then(prods => {
                   for (var i=0; i<cart.length; i++) {
                     for (var j=0; j<prods.length; j++){
                       if (cart[i]==prods[j].href){
                         mas.push(prods[j]);
                         console.log("elem" + cart[i]);
                         break;
                   }
                   }
                 }res.json(mas)

            				/*	Prod.find().skip(1).limit(7)
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

        Prod.find()
          .then(prods => {
            for (var i=0; i<list.length; i++) {
              for (var j=0; j<prods.length; j++){
                if (list[i]==prods[j].href){
                  mas.push(prods[j]);
                  console.log("elem" + list[i]);
                  break;
            }
            }
          }res.json(mas)

             /*	Prod.find().skip(1).limit(7)
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
           Prod.findOne({ 'name': bar})
         .then(prod =>
          Prod.remove({ 'name': bar})
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
           Prod.findOne({ 'name': bar})
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
          Prod.insert({
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

               Prod.find({title:{'$regex': '.*' + mas[1] + '.*', '$options': '$i'}})
                 .then(prod =>res.json(prod))
                   .catch(err => res.status(404).json({ error: "ERROR" }));
             }
             if(mas[0] == "color"){
               Prod.find({color:{'$regex': '.*' + mas[1] + '.*', '$options': '$i'}})
                 .then(prod =>res.json(prod))
                   .catch(err => res.status(404).json({ error: "ERROR" }));
             }

             if(mas[0] == "brand"){
               Prod.find({brand:{'$regex': '.*' + mas[1] + '.*', '$options': '$i'}})
                 .then(prod =>res.json(prod))
                   .catch(err => res.status(404).json({ error: "ERROR" }));
             }
             if(mas[0] == "price"){
               console.log(mas);
               var a = parseInt(mas[2]);
               if(mas[1]=="%3E"){  //>
                 Prod.find({price: {$gt : a}})
                   .then(prod =>res.json(prod))
                     .catch(err => res.status(404).json({ error: "ERROR" }));
               }
               if(mas[1]=="%3C"){   //<
                 Prod.find({price: {$lt : a}})
                   .then(prod =>res.json(prod))
                     .catch(err => res.status(404).json({ error: "ERROR" }));
               }
               if(mas[1]=="%3E="){    //>=
                 Prod.find({price: {$gte : a}})
                   .then(prod =>res.json(prod))
                     .catch(err => res.status(404).json({ error: "ERROR" }));
               }
               if(mas[1]=="%3C="){     //<=
                 Prod.find({price: {$lte : a}})
                   .then(prod =>res.json(prod))
                     .catch(err => res.status(404).json({ error: "ERROR" }));
               }
               if(mas[1]=="="){     //=
                 Prod.find({price: a})
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

               Prod.update({title : mas[0]}, {$set: {title : mas[2]}})
                 .then(prod =>res.json(prod))
                   .catch(err => res.status(404).json({ error: "ERROR" }));
             }
             if(mas[1] == "color"){
               Prod.update({title : mas[0]}, {$set: {color : mas[2]}})
                 .then(prod =>res.json(prod))
                   .catch(err => res.status(404).json({ error: "ERROR" }));
             }
             if(mas[1] == "weight"){
             Prod.update({title : mas[0]}, {$set: {weight: mas[2]}})
                   .then(prod =>res.json(prod))
                     .catch(err => res.status(404).json({ error: "ERROR" }));
             }
             if(mas[1] == "price"){
               var a = parseInt(mas[2]);
               Prod.update({title : mas[0]}, {$set: {price : a}})
                     .then(prod =>res.json(prod))
                       .catch(err => res.status(404).json({ error: "ERROR" }));
               }
               if(mas[1] == "price"){
                 var a = parseInt(mas[2]);
                 Prod.update({title : mas[0]}, {$set: {price : a}})
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


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}
