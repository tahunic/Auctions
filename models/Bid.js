var bookshelf = require('../config/bookshelf');
var user = require('./User');
var auction = require('./Auction');

var Bid = bookshelf.Model.extend({
  tableName: 'bids',
  hasTimestamps: true,
  users: function() {
    return this.belongsTo(user);
  },
  auctions: function() {
    return this.belongsTo(auction);
  },
});

module.exports = Bid;
