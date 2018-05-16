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
    PostCampaign = require('./api/models/PostCampaignManagementModel'),
    PostManagement = require('./api/models/PostManagementModel'),
    bodyParser = require('body-parser'),
    
    XsystemPage = require('./api/models/Xsystem/XsystemPageModel'),
    XsystemPostType = require('./api/models/Xsystem/XsystemPostTypeModel'),
    XsystemDomainUrl = require('./api/models/Xsystem/XsystemDomainUrlModel'),
    XsystemApiUrl = require('./api/models/Xsystem/XsystemApiUrlModel')
    ;
    
var cors = require('cors');
const {users, populateUsers} = require('./seed/seed');
const fileUpload = require('express-fileupload');
// mongoose instance connection url connection
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/thesis');
// mongoose.connect('mongodb://admin:admin@ds263847.mlab.com:63847/thesis');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use for upload file
app.use(fileUpload());
app.use('/uploads', express.static(__dirname + '/uploads'));

let todoListRoute = require('./api/routes/todoListRoute'); //importing route
let userRoute = require('./api/routes/UserRoute');
let adsAreaRoute = require('./api/routes/AdsAreaRoute');
let priceFactorRoute = require('./api/routes/PriceFactorRoute');
let servicePriceRoute = require('./api/routes/ServicePriceRoute');
let promotionManagement = require('./api/routes/PromotionManagementRoute');
let postCampaignManagement = require('./api/routes/PostCampaignManagementRoute');
let postManagement = require('./api/routes/PostManagementRoute');

let xSystemPageRoute = require('./api/routes/Xsystem/XsystemPageRoute');
let xSystemPostTypeRoute = require('./api/routes/Xsystem/XsystemPostTypeRoute');
let xSystemDomainUrlRoute = require('./api/routes/Xsystem/XsystemDomainUrlRoute');
let xSystemApiUrlRoute = require('./api/routes/Xsystem/XsystemApiUrlRoute');

let xSystemInteractionRoute = require('./api/routes/XSystemInteractionRoute');

todoListRoute(app); //register the route
userRoute(app);
adsAreaRoute(app);
priceFactorRoute(app);
servicePriceRoute(app);
promotionManagement(app);
postCampaignManagement(app);
postManagement(app);
xSystemInteractionRoute(app);

xSystemPageRoute(app);
xSystemPostTypeRoute(app);
xSystemDomainUrlRoute(app);
xSystemApiUrlRoute(app);

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);
