const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite', // banco
  storage: './db/app.db' //Onde esta o banco
});

module.exports =  sequelize;