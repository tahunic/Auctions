var bookshelf = require('../config/bookshelf');
var user = require('./User');

var Auction = bookshelf.Model.extend({
  tableName: 'auctions',
  hasTimestamps: true,
  users: function() {
    return this.belongsTo(user);
  }
});

module.exports = Auction;
