const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');

const { User } = require('../api/models/UserModel');

const userOneId = new ObjectId();
const users = [{
    _id: userOneId,
    email: 'superadmin@gmail.com',
    password: 'superadmin',
    tokens: [{
        access: 'auth',
        token: jwt.sign({ _id: userOneId, access: 'auth' }, "abc123").toString()
    }]
}];

const populateUsers = (done) => {
    User.remove({}).then(() => {
        var userAdmin = new User(users[0]).save();

        return Promise.all([userAdmin])
    }).then(() => done());
};

module.exports = {users, populateUsers};