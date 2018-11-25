const _ = require('lodash');
const AuthDataStore = require('../models/auth');
const authDS = new AuthDataStore();

function Auth() {
    var self = this;

    self.login = function(req, res, next) {
        var user = req.body;

        if (authDS.login(user.username, user.password)) {
            res.send(200, {
                message: 'user logged in'
            }); 
        } else {
            res.send(401, {
                message: 'user not authenticated'
            });
        }
        return next();
    };

    self.logout = function(req, res, next) {
        var user = req.body;

        if (authDS.logout(user.username)) {
            res.send(200, {
                message: 'user logged out'
            }); 
        } else {
            res.send(401, {
                message: 'user not found'
            });
        }
        return next();
    };

    self.authenticate = function(req, res, next) {
        var username = req.query.username;

        if (authDS.isAuthenticated(username)) {
            res.send(200, {
                message: 'user authenticated'
            }); 
        } else {
            res.send(401, {
                message: 'user not authenticated'
            });
        }

        return next();
    }
}

module.exports = new Auth();
