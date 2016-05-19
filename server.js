var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var swig = require('swig');

var app = express();

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.set('view cache', false);

app.set('port', (process.env.PORT || 3000));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var users = [
    {
        'name': 'Bob',
        'department': 'IT',
        'salary': 10000
    },
    {
        'name': 'Clive',
        'department': 'Management',
        'salary': 50000000
    }
];

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/ajax', function(req, res) {
    res.render('ajax', {
        'users': JSON.stringify(users)
    });
});

app.get('/users', function(req, res) {
    var returnedUsers = users.slice(0);

    returnedUsers.push({
        'name': 'HAL 9000',
        'department': 'IT',
        'salary': 0
    });

    res.json(returnedUsers);
});

// Additional middleware which will set headers that we need on each /api request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows the api routes to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});


app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
