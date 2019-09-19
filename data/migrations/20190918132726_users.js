exports.up = function(knex) {
  return (
    knex.schema
      //! USERS
      .createTable("users", users => {
        users.increments();
        users
          .string("username", 128)
          .notNullable()
          .unique();
        users.string("password", 128).notNullable();
        users.text("departments", 1000);
      })
  );
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
