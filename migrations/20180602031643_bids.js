exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('bids', function(table) {
      table.increments();
      table.string('external_id').unique();
      table.integer('auction_id').references('auctions.id').unsigned().notNullable();
      table.integer('user_id').references('users.id').unsigned().notNullable();
      table.decimal('amount').notNullable();
      table.timestamps();        
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('bids')
  ])
};
