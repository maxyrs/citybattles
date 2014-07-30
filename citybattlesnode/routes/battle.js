var express = require('express');
var router = express.Router();
var Parse = require('parse').Parse;

Parse.initialize("unitX88tQcs0FUtOy1ridPOKzNiGYlcvFDtCduHP", "HF0sGCMBC2KqzagEvw5dHfEVCt17CrHg9YbzQfll");
/* GET home page. */
router.get('/', function(req, res){

  var Questions = Parse.Object.extend("Questions");
	var query = new Parse.Query(Questions);

	query.count({
 	 	error: function(error) {
  		// Error counting objects
 	 	},
 	 	success: function(count) {

  	  		query.skip(Math.floor(Math.random() * (count - 1)));

  	  		query.limit(1);

  	  		query.find({
   	   			error: function(error){
       			 // Error retrieving object D: halp
   	   		},
    			   success: function(objects) {
    	   	    	console.log("Successfully retrieved " + objects.length + " questions.");
    			 	//Parse.object values returned
   			   		for (var i = 0; i < objects.length; i++) { 
     	 				var object = objects[i];
    	  				var questions = object.get('Question');
    	  				console.log(questions);
    	  				var answers = object.get('Answer');
                console.log(answers);
   			 		}

   			 		if(Parse.User.current()){
 							Parse.User.current().fetch().then(function (user) {
    						var username = user.username;
    						res.render('battle', { title: "CityBattles", user: username, question: questions, answer: answers });
    				    });
					   }
   				}
    		});
  	     }
	});
});

module.exports = router;

// var Questions = Parse.Object.extend("Questions");
// var query = new Parse.Query(Questions);
// query.equalTo("Question", "When was Young Rewired State founded?");
// query.find({
//   success: function(results) {
//     console.log("Successfully retrieved " + results.length + " answer.");
//     // Do something with the returned Parse.Object values
//     for (var i = 0; i < results.length; i++) { 
//       var object = results[i];
//       console.log(object.get('Answer'));
//     }
//   },
//   error: function(error) {
//     console.log("Error: " + error.code + " " + error.message);
//   }
// });
