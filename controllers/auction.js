var Auction = require('../models/Auction');
var config = require('../knexfile');
var knex = require('knex')(config);

/**
 * Create new auction
 * POST /auctions
 */
exports.auctionPost = function (req, res) {
  req.assert('title', 'Title cannot be blank').notEmpty();
  req.assert('minPrice', 'Minimum price cannot be blank').notEmpty();
  req.assert('initialPrice', 'Minimum price cannot be blank').notEmpty();
  req.assert('duration', 'Duration cannot be blank').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    return res.status(400).send(errors);
  }

  new Auction({
    title: req.body.title,
    description: req.body.description,
    initial_price: req.body.initialPrice,
    min_price: req.body.minPrice,
    duration: req.body.duration,
    auction_owner_id: req.user.id,
  }).save()
    .then(function (response) {
      res.send({ msg: 'New auction successfully added.' });
    })
    .catch(function (err) {
      return res.status(400).send({ msg: 'An error occurred while adding new auction.' });
    });
};
