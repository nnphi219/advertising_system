var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Task = require('./api/models/todoListModel'), //created model loading here
    AdsArea = require('./api/models/AdsAreaModel'),
    bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/ads_system'); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var todoListRoute = require('./api/routes/todoListRoute'); //importing route
var adsAreaRoute = require('./api/routes/AdsAreaRoute');

todoListRoute(app); //register the route
adsAreaRoute(app);

app.listen(port);



console.log('todo list RESTful API server started on: ' + port);
