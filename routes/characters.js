var express = require('express');
var router = express.Router();
var request = require('request');

//Get all characters
router.get('/', function(req, res, next){
	request('http://ec2-52-54-102-237.compute-1.amazonaws.com:3000/characters', function (error, response, body) {
		var characters = JSON.parse(body).characters;
		if (!error && response.statusCode == 200) {
			request('http://ec2-52-54-102-237.compute-1.amazonaws.com:3000/users', function (error, response, body) {
	  		if (!error && response.statusCode == 200) {
	  			var users = JSON.parse(body).users;
	  			characters.forEach((character)=> {
	  				users.forEach((user)=> {
	  					if(character.user_id == user.id){
	  						character.user_id = user.name;
	  					}
	  				})
	  			})
	   			res.render('characters', { characters: characters });
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

//Get a character by id
router.get('/:id', function(req, res, next){
	request('http://ec2-52-54-102-237.compute-1.amazonaws.com:3000/characters/' + req.params.id, function (error, response, body) {
		var character = JSON.parse(body).character;
		if (!error && response.statusCode == 200) {
			request('http://ec2-52-54-102-237.compute-1.amazonaws.com:3000/users', function (error, response, body) {
	  		if (!error && response.statusCode == 200) {
	  			var users = JSON.parse(body).users;
  				users.forEach((user)=> {
  					if(character.user_id == user.id){
  						character.user_id = user.name;
  					}
  				})
	   			res.render('character', { character: character });
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