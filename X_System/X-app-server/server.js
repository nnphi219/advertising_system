var express = require('express'),
    app = express(),
    port = process.env.PORT || 8081,
    mongoose = require('mongoose'),

    Task = require('./api/models/todoListModel'), //created model loading here
    User = require('./api/models/UserModel'),
    Post = require('./api/models/PostModel'),

    bodyParser = require('body-parser');
var cors = require('cors');
var hostname = 'http://xsystem-server.localtest.me';
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/x_system'); 
mongoose.connect('mongodb://xsystemadmin:xsystemadmin@ds115569.mlab.com:15569/xsystem');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var todoListRoute = require('./api/routes/todoListRoute'); //importing route
var userRoute = require('./api/routes/UserRoute');
var postRoute = require('./api/routes/PostRoute');

todoListRoute(app); //register the route
userRoute(app);
postRoute(app);

app.listen(port);



console.log('todo list RESTful API server started on: ' + port);
