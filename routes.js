let express = require('express');
//let sportControllerApi = require('./controllers/produit');
let userControllerApi = require('./controllers/userControllerApi');
const produitController = require('./controllers/produitController');
const commandController = require('./controllers/commandController')
let router = express.Router();

router.get('/api/users', userControllerApi.userList);
router.post('/api/register', userControllerApi.createAccount);
router.post('/api/login', userControllerApi.login);

router.get('/produits',produitController.produitList);
router.post('/produit',produitController.produitCreate);
router.put('/produit/:idproduit', produitController.produitUpdate);
router.delete('/produit/:idproduit', produitController.produitDelete);

router.get('/commandes',commandController.getCommandes);
//router.post('/commande',commandController.commandCreate);
//router.post('/commande', commandController.newCommand);
router.post('/commande/produit', commandController.addProductToCommand);
router.get('/api/users/:iduser/orders',commandController.getOrdersForUser)

router.delete('/commands/:commande_id/products/:idproduit', commandController.deleteProduitFromCommand);

//router.get('/commande/findoneuser/:iduser', commandeController.userFindOneUser);

module.exports = router;