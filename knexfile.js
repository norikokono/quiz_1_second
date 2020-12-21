// Update with your config settings.
module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: 'cluckr_2_development',
      username: 'noriko',
      password: 'Prettier'
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: 'db/migrations'
    }
  },
};