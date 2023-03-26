"use strict";

require('dotenv').config();

var Sequelize = require('sequelize');

var sequelize = process.env.JAWSDB_URL ? new Sequelize(process.env.JAWSDB_URL) : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  dialectOptions: {
    decimalNumbers: true
  }
});
module.exports = sequelize;
//# sourceMappingURL=connection.dev.js.map