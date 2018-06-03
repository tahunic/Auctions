var bookshelf = require('../config/bookshelf');
var user = require('./User');

var Auction = bookshelf.Model.extend({
  tableName: 'auctions',
  hasTimestamps: true,
  owner: function() {
    return this.belongsTo(user, 'auction_owner_id');
  },
  winner: function() {
    return this.belongsTo(user, 'auction_winner_id');
  }
});

module.exports = Auction;
