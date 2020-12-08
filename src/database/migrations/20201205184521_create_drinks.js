exports.up = function(knex) {
    return knex.schema.createTable('drinks', function (table) {
        table.increments();
        table.string('name').notNullable();
        table.string('description').notNullable();
        table.decimal('price').notNullable();
        table.string('picture').notNullable();
    })  
};

exports.down = function(knex) {
    return knex.schema.dropTable('drinks');
};