var async = require('async');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var request = require('request');
var qs = require('querystring');
var User = require('../models/User');

function generateToken(user) {
  var payload = {
    iss: 'my.domain.com',
    sub: user.id,
    iat: moment().unix(),
    exp: moment().add(7, 'days').unix()
  };
  return jwt.sign(payload, process.env.TOKEN_SECRET);
}

/**
 * Login required middleware
 */
exports.ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

  /**
   * POST /login
   * Sign in with username and password
   */
  exports.loginPost = function(req, res, next) {
    req.assert('username', 'Username cannot be blank').notEmpty();
    req.assert('password', 'Password cannot be blank').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
      return res.status(400).send(errors);
    }

    new User({ username: req.body.username })
      .fetch()
      .then(function(user) {
        if (!user) {
          return res.status(401).send({ msg: 'The username ' + req.body.username + ' is not associated with any account. ' +
          'Double-check your username and try again.'
          });
        }
        user.comparePassword(req.body.password, function(err, isMatch) {
          if (!isMatch) {
            return res.status(401).send({ msg: 'Invalid username or password' });
          }
          res.send({ token: generateToken(user), user: user.toJSON() });
        });
      });
  };

/**
 * POST /signup
 */
exports.signupPost = function(req, res, next) {
  req.assert('username', 'Username cannot be blank').notEmpty();
  req.assert('password', 'Password must be at least 4 characters long').len(4);

  var errors = req.validationErrors();

  if (errors) {
    return res.status(400).send(errors);
  }

  new User({
    username: req.body.username,
    password: req.body.password
  }).save()
    .then(function(user) {
        res.send({ token: generateToken(user), user: user });
    })
    .catch(function(err) {
      if (err.code === 'ER_DUP_ENTRY' || err.code === '23505') {
        return res.status(400).send({ msg: 'The username you have entered is already associated with another account.' });
      }
    });
};
