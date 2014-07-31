var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Parse = require('parse').Parse;

Parse.initialize("unitX88tQcs0FUtOy1ridPOKzNiGYlcvFDtCduHP", "HF0sGCMBC2KqzagEvw5dHfEVCt17CrHg9YbzQfll");

var routes = require('./routes/index');
var users = require('./routes/users');
var signup = require('./routes/signup');
var login = require('./routes/login');
var battle = require('./routes/battle');
var geolocation = require('./routes/geolocation');
var league = require('./routes/league');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/signup', signup);
app.use('/login', login);
app.use('/battle', battle);
app.use('/geolocation', geolocation);
app.use('/league', league);

app.get('/signup', function(req, res){
    res.render('signup');
});

app.post('/signup', function(req, res){
    var user = new Parse.User();
    user.set("username", req.body.username);
    user.set("email", req.body.email);
    user.set("password", req.body.password);
 
    user.signUp(null, {
        success: function(user) {
            res.redirect('/login');
         },
         error: function(user, error) {
            res.send("Error: " + error.code + " " + error.message);
        }
    });
});

app.post('/geolocation', function(req, res){
    console.log(JSON.stringify(req.body.city));
});


app.get('/login', function(req, res) {
    res.render('login');
});

app.post('/login', function(req, res) {
    Parse.User.logIn(req.body.username, req.body.password, {
         success: function(user) {
            user.fetch().then(function(fetchedUser){
                 name = fetchedUser.getUsername();
                 console.log(name);
                 res.redirect('/battle');
            }, function(error){
                res.send("Error: " + error.code + " " + error.message);
            });
         },
         error: function(user, error) {
             res.redirect('/login');
             res.send("Error: " + error.code + " " + error.message);
         }
    });
});

app.get('/battle', function(req, res) {
    res.render('/battle');
});

app.post('/battle', function(req, res) {
    var Questions = Parse.Object.extend("Questions");
    var query = new Parse.Query(Questions);
    // question = exports.question;
    // console.log(exports.question);
    console.log(question);
    query.equalTo("Question", question);
    query.equalTo("Answer", req.body.answer);
    console.log(req.body.answer);
    query.find({
        success: function(results) {

            // res.render(results);
            // var answer = results[0].get("Answer");
            // console.log(answer);
             if (results.length === 0) {
                console.log("poo. the answer is wrong. comic sans is great.")
            }
             else {   
              console.log(results);
              var city = Parse.User.current().get("city");
                 console.log(city);
                 var Cities = Parse.Object.extend("Cities");
                 var query = new Parse.Query(Cities);
                 query.equalTo("City", city);
                query.find({
                    success: function(results) {
                         console.log("Successfully retrieved " + results.length + " score.");
                         for (var i = 0; i < results.length; i++) {
                             var object = results[i];
                             results[i].increment("Score");
                             results[i].save();
                         }
             },
             error: function(error) {
                console.log("Error: " + error.code + " " + error.message);
                res.redirect('/battle');
             }
         }); 
         }
         res.redirect('/battle');
        },
         error: function(error) {
             console.log("Ah! No! That didn't work! :c");
             res.redirect('/battle');
         }
    });
});

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
