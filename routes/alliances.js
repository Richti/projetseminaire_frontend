var express = require('express');
var router = express.Router();
var request = require('request');

//Get all alliances
router.get('/', function(req, res, next){
	request('http://ec2-52-54-102-237.compute-1.amazonaws.com:3000/alliances', function (error, response, body) {
		var alliances = JSON.parse(body).alliances;
  		if (!error && response.statusCode == 200) {
			res.render('alliances', { alliances: alliances });
		}
		else{
			res.render('Error');
		}
	})
});

//Get an alliance by id
router.get('/:id', function(req, res, next){
	request('http://ec2-52-54-102-237.compute-1.amazonaws.com:3000/alliances/' + req.params.id, function (error, response, body) {
		var alliance = JSON.parse(body).alliance;
  		if (!error && response.statusCode == 200) {
			res.render('alliance', { alliance: alliance });
		}
		else{
			res.render('Error');
		}
	})
});

module.exports = router;
