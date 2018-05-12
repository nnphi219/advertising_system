var mongoose = require('mongoose'),
  User = mongoose.model('Users');

var authenticate = (req, res, next) => {
  var token = req.header('x-auth');

  User.findByToken(token).then((user) => {
    if (!user) {
      return Promise.reject();
    }

    req.user = user;
    req.token = token;
    next();
  }).catch((e) => {
    res.status(401).send();
  });
};

var authenticateAdmin = (req, res, next) => {
  var token = req.header('x-auth');

  User.findByUserType(token, 'admin').then((user) => {
    if (!user) {
      return Promise.reject();
    }

    req.user = user;
    req.token = token;
    next();
  }).catch((e) => {
    res.status(401).send();
  });
};

var authenticateQCSystem = (req, res, next) => {
  var token = req.header('xsystem-auth');
 
  User.findByToken(token).then((user) => {
    if (!user) {
      return Promise.reject();
    }

    req.user = user;
    req.token = token;
    next();
  }).catch((e) => {
    res.status(401).send();
  });
};



module.exports = { authenticate, authenticateAdmin, authenticateQCSystem };