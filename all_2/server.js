var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var configDB = require('./config/database.js');

mongoose.connect(configDB.url);
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());

app.set('view engine', 'ejs');

app.use(session({ secret: 'appallowpasstook' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

const mongodb = require('promised-mongo');
var path = require('path');
const busboyBodyParser = require('busboy-body-parser');
const url = 'mongodb://localhost:27017/magaz';
const db = mongodb(url);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.use(busboyBodyParser({ limit: '5mb' }));
app.use(express.static(path.join(__dirname, 'design')));
const salt = '%656_das9870';



app.get('/', (req, res) => {

		db.collection('prod').find().limit(9)
		.then(prods => {
			db.collection('prod').find().skip(4).limit(7)
			.then(sales => {
				db.collection('prod').count()
					.then(count => {
			res.render('index', {
				sales: sales,
				prods: prods,
				count: count,
				href_add:'addprod',
			//	user : req.user
			});
			})
				})
		})
		.catch(err => res.status(500).end(err));
});

app.get('/pag*', (req, res) => {
			var decrease = req.path;
			decrease = decrease.slice(4);
			var i = parseInt(decrease);
		db.collection('prod').count()
			.then(count => {
		db.collection('prod').find().skip(0+i*9).limit(9+i*9)
				.then(prods => {
		db.collection('prod').find().skip(4).limit(7)
				.then(sales => {

					res.render('index', {
						sales: sales,
						count: count,
						prods: prods,
						href_add:'addprod',
					//	user : req.user
					});
					})
				})
				.catch(err => res.status(500).end(err));
			});

});


////////////////////////////////////////////////////////////////////
///////////////////////JSON////////////////////////////////////////

app.get('/jsonadd', (req, res) => {
	db.collection('prod').find().skip(5).limit(7)
	.then(sales => res.json(sales))
	 .catch(err => res.status(404).json({ error: err }));
});

app.post('/jsonaddtocart', (req, res) => {
  	var title = req.body.prtitle;
    var id= req.body.prid;
  	if (!title || ! id){
		res.json({'error':'need login'})
	   }
  	  db.collection('users').find({"identef": parseInt(id)})
		  .then(user => res.json(user))
});

app.post('/jsonaddtolist', (req, res) => {
	  	var title = req.body.prtitle;
	   var id= req.body.prid;
		 if (!title || ! id){
			res.json({'error':'need login'})
		 }
		 db.collection('users').find({"identef": parseInt(id)})
			 .then(user => res.json(user))
});

app.post('/jsonPadd', (req, res) => {
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


			if (!title || !color || !brand || !price || !lastprice || !type || !weight || !description || !guarantee ) res.status(400).json({"error": "empty field"});
			else {
				db.collection('prod').findOne({ title: title})
					.then(prod => {
						if (prod) res.status(200).json({"error": "prod exists"});
						else {


							db.collection('prod').insert({
								title: title,
								color: color,
								weight: weight,
								guarantee: guarantee,
								description: description,
								price: price,
								lastprice: lastprice,
								type:type,
								brand: brand,
								avatar1: base64String1,
								avatar2: base64String2,
								avatar3: base64String3,
								avatar4: base64String4,
								href: hrefProd
							});
						}
					})
					.then(prod => res.json(prod))
					/*	db.collection('prod').find().skip(1).limit(7)
						.then(sales => res.json(sales))*/
						.catch(err => res.status(404).json({ error: err }));
			}
});

app.get('/json', (req, res) => {
			db.collection('prod').find()
				.then(prod => res.json(prod))
				/*	db.collection('prod').find().skip(1).limit(7)
					.then(sales => res.json(sales))*/
					.catch(err => res.status(404).json({ error: err }));
})

///////////////////////JSON////////////////////////////////////////
////////////////////////////////////////////////////////////////////


require('./app/routes.js')(app, passport); 
require('./config/passport')(passport);


app.listen(8000, () => console.log('App started.'));
