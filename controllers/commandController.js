const db = require('../models/index');
const Commande = db.Commande;
const User = db.User;
const Produit = db.Produit;
const CommandProduct = db.CommandProduct;

exports.addProductToCommand = async function (req, res) {
  
  const { commande_id, idproduit, quantity } = req.body;

  const commandProduct = await CommandProduct.create({
    quantity: quantity,
  });

  const commande = await Commande.findByPk(commande_id);
  if (!commande) {
    return res.status(404).json({ error: 'Commande not found' });
  }
  console.log("s");
  const produit = await Produit.findByPk(idproduit);
  if (!produit) {
    return res.status(404).json({ error: 'Produit not found' });
  }

  await commande.addProduit(produit, {
    through: commandProduct,
  });

  return res.json(commandProduct);
}


exports.getOrdersForUser = async function (req, res) {
  const iduser = req.params.iduser;

  const orders = await Commande.findAll({
    where: { iduser: iduser },
    include: [{ model: db.Produit }],
  });

  return res.json(orders);
};





// exports.commandList = async function (req, res) {
//     await Command.findAll()
//         .then(data => {
//             console.log("All command:", JSON.stringify(data, null, 2));
//             res.json(data);
//         })
//         .catch(err => {
//             res.status(500).json({ message: err.message })
//         })
// }





// exports.userFindOneUser = async function (req, res) {
//     if (req.params.iduser) {
//         await User.findOne({ where: { iduser: req.params.iduser } })
//             .then(data => {
//                 res.json(data);
//             })
//             .catch(err => {
//                 res.status(500).json({ message: err.message })
//             })
//     }
//     else res.status(400).json({ message: 'User not found' })
// }

// exports.newCommand = async function (req, res) {
//   try {
//     const { iduser, quantity, produitIds } = req.body;

//     // find the user with the specified iduser
//     const user = await User.findByPk(iduser);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // create a new command instance and associate it with the user
//     const command = await Command.create({ quantity: quantity });
//     await command.setUser(user);

//     // add the specified produits to the command
//     const produits = await Produit.findAll({ where: { idproduit: produitIds } });
//     await command.addProduits(produits);

//     // send the newly created command back in the response
//     res.status(201).json(command);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

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

  return res.json({ message: 'Produit removed from command' });
};
    
exports.getCommandes = async function (req, res) {
  try {
    const commandes = await Commande.findAll({
      include: [
        {
          model: Produit,
          attributes: ['nom', 'prix'],
          through: {
            attributes: ['quantity'],
          },
        },
      ],
    });

    const commandesWithTotal = commandes.map(commande => {
      const produits = commande.produits.map(produit => {
        return {
          nom: produit.nom,
          prix: produit.prix,
          quantity: produit.command_product.quantity,
          total: produit.prix * produit.command_product.quantity,
        };
      });
      const total = produits.reduce((sum, produit) => sum + produit.total, 0);
      return {
        id: commande.commande_id,
        user_id: commande.iduser,
        createdAt: commande.createdAt,
        updatedAt: commande.updatedAt,
        produits,
        total,
      };
    });

    return res.json(commandesWithTotal);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};






















