var express = require('express');
var router = express.Router();
var Parse = require('parse').Parse;

Parse.initialize("unitX88tQcs0FUtOy1ridPOKzNiGYlcvFDtCduHP", "HF0sGCMBC2KqzagEvw5dHfEVCt17CrHg9YbzQfll");

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

module.exports = router;
