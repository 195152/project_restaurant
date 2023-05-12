const Sequelize = require('sequelize')
const db = require('../db.js')

const Produit = db.define('produit', {
    idproduit: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey:true
    },
    nom: { type: Sequelize.STRING },
    prix: { type: Sequelize.STRING},
   
    createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
    },
    updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
    }
})

module.exports = Produit;
