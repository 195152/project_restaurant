const Sequelize = require('sequelize');
const db = {};

db.Sequelize = Sequelize;

db.User = require('./userModel');
db.Produit = require('./produitModel');
db.Commande = require('./commandeModel.js');
db.CommandProduct = require('./CommandProduct.js');

///******Begin section********************* */
// this used to link a commande to a user,
// so we can get all commandes for a given user
db.User.hasMany(db.Commande); //*** */
db.Commande.belongsTo(db.User);//**** */
///*******End section****************** */




///******Begin section********************* */
// this used as intermediate table
// link a commande(defined in commande table, with a user) to a given product product
// so the flow is : 
//      1: save a commande and the user in table commande
//      2: get the commande id, the product id and save them into the intermediate table
db.Commande.belongsToMany(db.Produit, { through: db.CommandProduct }); //*** */
db.Produit.belongsToMany(db.Commande, { through: db.CommandProduct });//**** */
///*******End section****************** */


module.exports = db;
