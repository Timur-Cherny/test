const { DataSource } = require("typeorm");



module.exports = new DataSource({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      entities: ['src/db/entity/**.entity.js'],
    })