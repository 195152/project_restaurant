const db = require('../models/index');
const Produit = db.Produit;

exports.produitList = async function (req, res) {
    await Produit.findAll()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}
exports.produitCreate = async function (req, res) {
    let produit= Produit.build({ nom: req.body.nom, prix: req.body.prix, description: req.body.description})
    await produit.save()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
    // or user.create in one time
}

/*exports.produitUpdate = async function (req, res) {
    if (req.params.idproduit > 0) {
        await Produit.update(
            { nom: req.body.nom, prix: req.body.prix },
            { where: { idproduit: req.params.idproduit } }
        )
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'produit not found' })
}*/

exports.produitDelete = async function (req, res) {
    if (req.params.idproduit) {
        await Produit.destroy({ where: { idproduit: req.params.idproduit } })
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'produit not found' })
}