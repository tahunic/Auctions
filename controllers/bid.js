var Bid = require('../models/Bid');
var config = require('../knexfile');
var knex = require('knex')(config);
var crypto = require('crypto');

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

  // Prevent from bidding lower than current bid
  if (req.body.currentBid >= req.body.newBid) {
    return res.status(400).send({ msg: 'Your bid must be higher than current bid.' });
  }
  
  // Prevent user from bidding on his own auctions
  if (req.body.auction.auction_owner_id === req.user.id) {
    return res.status(400).send({ msg: 'You cannot bid on your own auctions.' });    
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