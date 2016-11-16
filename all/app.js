const express = require('express');
const bodyParser = require('body-parser');
const busboyBodyParser = require('busboy-body-parser');
const mongodb = require('promised-mongo');

const crypto = require('crypto');
var path = require('path');
const app = express();







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

		db.collection('prod').find()
		.then(prods => {
			db.collection('prod').find().skip(4).limit(7)
			.then(sales => {



			res.render('index', {
				sales: sales,
				prods: prods,
        href_add:'addprod'
			});
			})
		})
    .catch(err => res.status(500).end(err));
});

app.get('/add', (req, res) => {
	db.collection('prod').find().skip(5).limit(7)
	.then(sales => {
	res.render('add',{
		sales:sales
	});
		})
});

app.get('/registration', (req, res) => {
	db.collection('prod').find().skip(4).limit(7)
	.then(sales => {
	res.render('registration',{
		sales:sales
	});
		})
});

app.get('/enter', (req, res) => {
	db.collection('prod').find().skip(2).limit(7)
	.then(sales => {
	res.render('enter',{
		sales:sales
	});
		})
});


app.get('/products', (req, res) => {
	db.collection('prod').find()
		.then(prods => {
			db.collection('prod').find().skip(1).limit(7)
			.then(sales => {

			res.render('products', {
				prods: prods,
				sales:sales
			});
				})
		})
		//.then(() => res.redirect('/prod'))
		.catch(err => res.status(500).end(err));

});


app.get('/products/*', (req, res) => {
	var decrease = req.path;
	console.log(req.path);
  decrease = decrease.slice(10);
	console.log(decrease);
var uri_dec = decodeURIComponent(decrease);

	db.collection('prod').findOne({ href: uri_dec})
		.then(prod => {
			db.collection('prod').find().skip(5).limit(7)
			.then(sales => {

			res.render('prod', {
				prod: prod,
        sales: sales
			});
			})
		})
		//.then(() => res.redirect('/prod'))
		.catch(err => res.status(500).end(err));

});



app.post('/add', (req, res) => {
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
		db.collection('prod').findOne({ title: title})
			.then(prod => {
				if (prod) res.status(200).end('prod exists');
				else {
					db.collection('users').findOne({ email: admEmail})

					return db.collection('prod').insert({
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
			.then(() => res.redirect('/products'))
			.catch(err => res.status(500).end(err));
	}
});




app.post('/registration', (req, res) => {
	var first_name = req.body.first_name;
	var second_name = req.body.second_name;
	var email = req.body.email;
	var pass = req.body.password;
	var password2 = req.body.password2;
	var phone = req.body.phone;
	var about = req.body.about;
	var login = req.body.login;
	var avaFile = req.files.avatar;

	var hrefProd = req.body.login;
	hrefProd = hrefProd.replace(/ /g, '').replace(/\//g, '');
	hrefProd= hrefProd.toLowerCase();
	var hrProd =( '/' + hrefProd);

	var base64String = avaFile.data.toString('base64');

	if (!first_name || !login || !second_name || !email || !pass || !password2 || (pass!=password2) || !phone || !about || !avaFile ) res.status(400).end('not ok');
	else {
		db.collection('users').findOne({ email: email})
		db.collection('users').findOne({ login: login})
			.then(user => {
				if (user) res.status(200).end('prod exists');
				else {

					return db.collection('users').insert({
						first_name: first_name,
						second_name: second_name,
						login: login,
						email: email,
						password: rypto.createHash('md5').update(pass + salt).digest("hex"),
						phone: phone,
						about:about,
						avatar: base64String,
						href: hrefProd,
						role: user
					});
				}
			})
			.then(() => res.redirect('/'))
			.catch(err => res.status(500).end(err));
	}
});


app.post('/enter', (req, res) => {

	var email = req.body.email;
	var password = req.body.password;

	if (!email || !password) res.status(400).end('not ok');
	else {
		db.collection('users').findOne({ email: email})

			.then(user => {
				if (user) {
					if(user.password == crypto.createHash('md5').update(password + salt).digest("hex"))
					{

console.log("user enter");
					}


					else res.status(400).end('not ok');
				}
			})
			.then(() => res.redirect('/'))
			.catch(err => res.status(500).end(err));
	}
});













app.listen(8000, () => console.log('App started.'));
