var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var server;

var store = {
	home:{
		page: "Hello express",
		content: "some awesome stuff"
	},
	about:{
		page: "Hello About",
		content: "some awesome stuff"
	},
	downloads: {
		page: "Hello Download",
		content: "some awesome stuff"
	},
	profile: {
		page: "Hello Profile",
		content: "some awesome stuff"
	}
}


app.set('view engine', 'jade')
//ставим колбеки в очередь
app.use(function(req, res, next){
	console.log('%s %s', req.method, req.url );
	next();
});

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));


app.get('/about', function(req ,res){
	res.render('about', {
		links: Object.keys(store)
	});
});


app.get('/new', function(req ,res){
	res.render('new', {
		page: 'Add new',
		links: Object.keys(store)
	});
});



app.post('/new', function(){
	
});



//первый путь а второй колбек
//req
//res


app.get('/:page?', function(req, res){
	var page = req.params.page, data;
	if (!page) page = 'home';
	data = store[page];
	if (!data) {
		res.redirect('/');
		return;
	}
	data.links = Object.keys(store);
	res.render('main', data);
}) ;


server = app.listen(3000, function(){
	console.log('Listening on port 3000');
} );