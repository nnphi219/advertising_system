var { User } = require('../api/models/UserModel');

var authenticate = (req, res, next) => {
    var token = req.header('x-auth');
  
    User.findByToken(token).then((user) => {
      if (!user) {
        return new Promise((resolve, reject) => {
          reject();
      });
      }
  
      res.user = user;
      req.token = token;
      next(req, res);
    }).catch((e) => {
      res.status(401).send();
    });
  };

  module.exports = {authenticate};