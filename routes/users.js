var express = require('express');
var router = express.Router();
var request = require('request');

//Get all users
router.get('/', function(req, res, next){
	request('http://localhost:3000/users', function (error, response, body) {
  		if (!error && response.statusCode == 200) {
   			 res.render('Users', { users: JSON.parse(body).users });
		  }
		else{
			res.render('Error');
		}
	})
	
});

//Get a user by id
router.get('/:id', function(req, res, next){
	
});

module.exports = router;
