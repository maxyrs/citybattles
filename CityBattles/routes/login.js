var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('login', { title: 'Login' });
});

// exports.login = function(req, res){
//  res.render('login', {title: 'Log In'});
// };

module.exports = router;