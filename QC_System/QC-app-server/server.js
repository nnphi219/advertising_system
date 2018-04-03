var express = require('express'),
    app = express(),
    port = process.env.PORT || 8080,
    mongoose = require('mongoose'),
    Task = require('./api/models/todoListModel'), //created model loading here
    User = require('./api/models/UserModel'),
    AdsArea = require('./api/models/AdsAreaModel'),
    PriceFactor = require('./api/models/PriceFactorModel'),
    ServicePrice = require('./api/models/ServicePriceModel'),
    PromotionManagement = require('./api/models/PromotionManagementModel'),
    PostCampaignManagement = require('./api/models/PostCampaignManagementModel'),
    bodyParser = require('body-parser');
var cors = require('cors');
const {users, populateUsers} = require('./seed/seed');

beforeEach(populateUsers);

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/ads_system');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var todoListRoute = require('./api/routes/todoListRoute'); //importing route
var userRoute = require('./api/routes/UserRoute');
var adsAreaRoute = require('./api/routes/AdsAreaRoute');
var priceFactorRoute = require('./api/routes/PriceFactorRoute');
var servicePriceRoute = require('./api/routes/ServicePriceRoute');
var promotionManagement = require('./api/routes/PromotionManagementRoute');
var postCampaignManagement = require('./api/routes/PostCampaignManagementRoute');

todoListRoute(app); //register the route
userRoute(app);
adsAreaRoute(app);
priceFactorRoute(app);
servicePriceRoute(app);
promotionManagement(app);
postCampaignManagement(app);

app.listen(port);



console.log('todo list RESTful API server started on: ' + port);
