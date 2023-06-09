const db = require('../models/index');
const Commande = db.Commande;
const User = db.User;
const Produit = db.Produit;
const CommandProduct = db.CommandProduct;

// /commande
exports.CreateCommand = async function (req, res) {
  const { iduser ,idproduit, quantity } = req.body;  
  let commande = await Commande.create({ userIduser: iduser})//etape: 1 (souha cmandet X)
  let comprod = await CommandProduct.create({produitIdproduit: idproduit, quantity: quantity , commandeCommandeId: commande.commande_id}) //souha cmandet thon
    if (!commande || !comprod) {
      return res.status(500).json({ error: 'Erreur ce produit lors de la creation du command, try again please' });
    }
    return res.sendStatus(200);
}



// /api/users/:iduser/orders
exports.getOrdersForUser = async function (req, res) {
  const iduser = req.params.iduser;

  const orders = await Commande.findAll({
    where: { userIduser: iduser },
    include: [{ model: db.Produit }],
  });
  res.json(orders);
  return
};


// /commands/:commande_id/products/:idproduit
exports.deleteProduitFromCommand = async function (req, res) {
  const { commande_id, idproduit } = req.params;

  const commande = await Commande.findByPk(commande_id);
  if (!commande) {
    return res.status(404).json({ error: 'Commande not found' });
  }
  const produit = await Produit.findByPk(idproduit);
  if (!produit) {
    return res.status(404).json({ error: 'Produit not found' });
  }
  await commande.removeProduit(produit);
  return res.status(200).json({ message: 'Produit removed from command' });
};


// /commandes
exports.getCommandes = async function (req, res) {
  try {
    const commandes = await Commande.findAll({
      include: [
        {
          model: Produit,
          attributes: ['nom', 'prix'],
          through: {
            model: CommandProduct
          },
        },
        {
          model: User,
          attributes: ['nom', 'email'],
        },
        
      ],
    });
    
    const commandesList = commandes.map((commande) => {
      let commandetemp = {};
      commandetemp["id"] = commande.commande_id;
        commande.produits.map((produit) => {
          const total = (produit.prix * produit.command_product.quantity).toFixed(2);
          commandetemp.total = total
          commandetemp["produit"] = {};
          commandetemp["produit"]["nom"] = produit.nom;
          commandetemp["produit"]["quantity"] = produit.command_product.quantity;
          
        });
        return commandetemp
      }
      );
     return res.status(200).json(commandesList);
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
};
