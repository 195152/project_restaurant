const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    'restaurent_management', 
    'root',
    'root', {
    dialect: 'mysql',
    host: 'localhost',
   }
);
module.exports = sequelize

