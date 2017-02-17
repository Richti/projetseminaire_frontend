var express = require('express');
var router = express.Router();
var request = require('request');

//Get all users
router.get('/', function(req, res, next){
	request('http://ec2-52-54-102-237.compute-1.amazonaws.com:3000/users', function (error, response, body) {
		var users = JSON.parse(body).users;
  		if (!error && response.statusCode == 200) {
   			request('http://ec2-52-54-102-237.compute-1.amazonaws.com:3000/alliances', function (error, response, body) {
		  		if (!error && response.statusCode == 200) {
		  			var alliances = JSON.parse(body).alliances;
		  			users.forEach((user)=> {
		  				alliances.forEach((alliance)=> {
		  					if(user.alliance_id == alliance.id){
		  						user.alliance_id = alliance.name;
		  					}
		  				})
		  			})
		   			res.render('users', { users: users });
				}
				else {
					res.render('Error');
				}
			})
		  }
		else{
			res.render('Error');
		}
	})	
});

//Get a user by id
router.get('/:id', function(req, res, next){
		request('http://ec2-52-54-102-237.compute-1.amazonaws.com:3000/users/' + req.params.id, function (error, response, body) {
		var user = JSON.parse(body).user;
  		if (!error && response.statusCode == 200) {
   			request('http://ec2-52-54-102-237.compute-1.amazonaws.com:3000/alliances', function (error, response, body) {
		  		if (!error && response.statusCode == 200) {
		  			var alliances = JSON.parse(body).alliances;
	  				alliances.forEach((alliance)=> {
	  					if(user.alliance_id == alliance.id){
	  						user.alliance_id = alliance.name;
	  					}
	  				})
		   			res.render('user', { user: user });
				}
				else {
					res.render('Error');
				}
			})
		  }
		else{
			res.render('Error');
		}
	})
});

module.exports = router;
