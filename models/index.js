const Sequelize = require('sequelize');
const db = {};

db.Sequelize = Sequelize;

db.User = require('./userModel');
db.Produit = require('./produitModel');
db.Commande = require('./commandeModel.js');
db.CommandProduct = require('./CommandProduct.js');

db.Commande.belongsTo(db.User, { foreignKey: 'iduser' });
db.User.hasMany(db.Commande, { foreignKey: 'iduser' });

db.Commande.belongsToMany(db.Produit, { through: 'CommandProduct' });
db.Produit.belongsToMany(db.Commande, { through: 'CommandProduct' });

module.exports = db;
