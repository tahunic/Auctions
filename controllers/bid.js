var Bid = require('../models/Bid');
var config = require('../knexfile');
var knex = require('knex')(config);
var crypto = require('crypto');
var moment = require('moment');

/**
 * Create new bid
 * POST /api/bids
 */
exports.bidPost = function (req, res) {
  req.assert('newBid', 'Bid cannot be blank').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    return res.status(400).send(errors);
  }
 
  // Prevent user from bidding on his own auctions
  if (req.body.auction.auction_owner_id === req.user.id) {
    return res.status(400).send({ msg: 'You cannot bid on your own auctions.' });    
  }

  // Prevent from bidding lower than current bid
  if (Number(req.body.currentBid) >= Number(req.body.newBid)) {
    return res.status(400).send({ msg: 'Your bid must be higher than current bid.' });
  }

  // Prevent from bidding if auction has expired
  if (moment().diff(req.body.auction.duration, new Date()) > 0) {
    return res.status(400).send({ msg: 'Auction has expired.' });
  }

  new Bid({
    external_id: crypto.randomBytes(8).toString('hex'),
    auction_id: req.body.auction.id,
    user_id: req.user.id,
    amount: req.body.newBid,
  }).save()
    .then(function (response) {
      res.send({ messages: [ {msg: 'You bid was successful.' }], amount: response.attributes.amount });
    })
    .catch(function (err) {
      return res.status(400).send({ msg: 'An error occurred while adding new bid.' });
    });
};