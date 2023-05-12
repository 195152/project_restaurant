const Sequelize = require('sequelize');
const db = require('../db.js');
const CommandProduct = db.define('command_product', {
    quantity: Sequelize.INTEGER,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  });
  
  CommandProduct.associate = (models) => {
    CommandProduct.belongsTo(models.Commande, {
      foreignKey: 'commande_id',
    });
    CommandProduct.belongsTo(models.Produit, {
      foreignKey: 'idproduit',
    });
  };
  
 
    


module.exports = CommandProduct;
