var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');                         // log requests to the console (express4)
var bodyParser = require('body-parser');                // pull information from HTML POST (express4)
var methodOverride = require('method-override');        // simulate DELETE and PUT (express4)

/* configuration */

mongoose.connect('mongodb://localhost/timeattendancesystem');       // connect to mongoDB database on modulus.io

app.use(express.static(__dirname + '/public'));                     // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                             // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));                // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                         // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));     // parse application/vnd.api+json as json
app.use(methodOverride());

/* define model */
var Timer = mongoose.model('Timer', {
    text : String,
    time : Date
});

/* routes */
// get all todos
app.get('/api/times', function(req, res) {

    // use mongoose to get all todos in the database
    Timer.find(function(err, times) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)

        res.json(times); // return all todos in JSON format
    });
});

// create todo and send back all todos after creation
app.post('/api/times', function(req, res) {

    // create a todo, information comes from AJAX request from Angular
    Timer.create({
        time : req.body.time,
        done : false
    }, function(err, time) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        Timer.find(function(err, times) {
            if (err)
                res.send(err)
            res.json(times);
        });
    });

});

// delete a todo
app.delete('/api/times/:time_id', function(req, res) {
    Timer.remove({
        _id : req.params.todo_id
    }, function(err, time) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        Timer.find(function(err, times) {
            if (err)
                res.send(err)
            res.json(times);
        });
    });
});

/* application */
app.get('*', function(req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

/* listen (start app with node server.js) */
app.listen(3030);
console.log("App listening on port 3030");
