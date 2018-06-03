exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('auctions', function(table) {
      table.increments();
      table.string('external_id').unique();
      table.string('title', 100).notNullable();
      table.text('description').notNullable();
      table.decimal('initial_price').notNullable();
      table.decimal('min_price').notNullable();
      table.datetime('duration').notNullable();
      table.integer('auction_owner_id').references('users.id').unsigned().notNullable();
      table.integer('auction_winner_id').references('users.id').unsigned();
      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('auctions')
  ])
};
