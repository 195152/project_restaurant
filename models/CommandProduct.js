const Sequelize = require('sequelize');
const db = require('../db.js');
const CommandProduct = db.define('command_product', {
    quantity: Sequelize.INTEGER,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
});


module.exports = CommandProduct;
