var express = require('express');
var router = express.Router();
var request = require('request');
var async = require('async')
var users = []


router.get('/', function(req, res, next) {
	res.render('index', { message: null });
});

router.get('/login', function(req, res, next) {
	res.render('login', {});
});

router.get('/register', function(req, res, next) {
	res.render('register', {});
});

router.post('/register', function(req, res, next) {
	let found = false
	for(let i = 0; i < users.length; i++) {
		if(users[i].login == req.body.login) {
			found = true
			res.render('index', {message: 'This user exist'})
		}
	}
	if(!found) { //found == false
		users.push({
			login: req.body.login,
			pass: req.body.pass
		})
		res.render('index', {message: 'You are registered'})
	}
});

router.post('/login', function(req, res, next) {
	let found = false
	for(let i = 0; i < users.length; i++) {
		if(users[i].login == req.body.login && users[i].pass == req.body.pass) {
			found = true
			res.render('index', {message: 'You are logged in!'})
		}
	}
	if(!found) { //found == false
		res.render('index', {message: 'This user is not exists'})
	}
});

router.get('/get/data', function(req, res, next) {
	var query = 'http://catalog.api.2gis.ru/2.0/catalog/branch/search?locale=ru_KG&region_id=112&q=%D1%82%D0%B5%D0%B0%D1%82%D1%80%D1%8B&region_id=1&page=*page*&page_size=1&fields=items.reviews&format=json&key=ruoedw9225';
	request(query, function (error, response, body){
		console.log(body);
		res.send('It works')
	});
});



module.exports = router;


