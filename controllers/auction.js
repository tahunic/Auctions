var Auction = require('../models/Auction');
var Bid = require('../models/Bid');
var config = require('../knexfile');
var knex = require('knex')(config);
var crypto = require('crypto');
var moment = require('moment');

/**
 * Create new auction
 * POST /api/auctions
 */
exports.auctionPost = function (req, res) {
  req.assert('title', 'Title cannot be blank.').notEmpty();
  req.assert('description', 'Description cannot be blank.').notEmpty();
  req.assert('minPrice', 'Minimum price cannot be blank.').notEmpty();
  req.assert('initialPrice', 'Minimum price cannot be blank.').notEmpty();
  req.assert('duration', 'Duration cannot be blank.').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    return res.status(400).send(errors);
  }

  if (req.body.minPrice < 1) {
    return res.status(400).send({ msg: 'Minimum price must be at least 1$.' });    
  }

  if (req.body.initialPrice < 1) {
    return res.status(400).send({ msg: 'Minimum price must be at least 1$.' });    
  }

  if (req.body.duration < 1 || req.body.duration > 30) {
    return res.status(400).send({ msg: 'Duration must be between 1 and 5 days.' });    
  }

  new Auction({
    external_id: crypto.randomBytes(8).toString('hex'),
    title: req.body.title,
    description: req.body.description,
    initial_price: req.body.initialPrice,
    min_price: req.body.minPrice,
    duration: moment().add(req.body.duration, 'minute').toDate(),
    auction_owner_id: req.user.id,
  }).save()
    .then(function (auction) {
      // When saving an auction, add initial bid for that auction and set it to the initial price of auction
      new Bid({
        external_id: crypto.randomBytes(8).toString('hex'),
        auction_id: auction.attributes.id,
        user_id: req.user.id,
        amount: auction.attributes.initial_price,
      }).save()
      .then(function (response) {
        res.send({ msg: 'New auction successfully added.' });
      })
      .catch(function (err) {
        return res.status(400).send({ msg: 'An error occurred while adding new auction.' });
      });
    })
    .catch(function (err) {
      return res.status(400).send({ msg: 'An error occurred while adding new auction.' });
    });
};

// TODO: implement paging

/**
 * Get all auctions
 * GET /api/auctions
 */
exports.auctionsGet = function (req, res) {
  Auction.collection()
    .orderBy('id', 'desc')
    .fetch({ withRelated: ['owner', 'winner'] })
    .then((response) => {
      res.send(response);
    })
    .catch(function (err) {
      return res.status(400).send({ msg: 'An error occurred while trying to load auctions.' })
    });
};

/**
 * Get won auctions by logged user
 * GET /api/auctions/won
 */
exports.auctionsWonGet = function (req, res) {
  Auction.where({ auction_winner_id: req.user.id })
    .orderBy('id', 'desc')
    .fetch({ withRelated: ['owner', 'winner'] })
    .then((response) => {
      if (response)
        res.send(response);
      else
        res.send([]);
    })
    .catch(function (err) {
      return res.status(400).send({ msg: 'An error occurred while trying to load auctions.' })
    });
};

/**
 * Get auction by id and latest bid for an auction
 * 
 * GET /api/auction/:id
 */
exports.auctionGet = function (req, res) {
  Auction.where({ external_id: req.params.id })
    .fetch({ withRelated: ['owner', 'winner'] })
    .then((auction) => {
      Bid.collection({ auction_id: auction.attributes.id })
        .orderBy('id', 'desc')
        .fetchOne()
        .then((bid) => {
          auction = auction.toJSON();
          bid = bid.toJSON();

          // Check if auction has expired
          // If auction has expired and latest bid amount is higher than minimum amount
          // for auction to succeed, set winner for that auction
          if (bid.amount > auction.min_price && bid.user_id !== auction.auction_owner_id) {
            Auction.where({ id: auction.id })
              .save({ auction_winner_id: bid.user_id }, { method: 'update' });
          }

          res.send({ data: auction, latestBid: bid });
        })
    })
    .catch(function (err) {
      return res.status(400).send({ msg: 'An error occurred while trying to load auction.' })
    });
};