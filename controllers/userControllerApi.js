const jwt = require('jsonwebtoken');
process.env.JWT_SECRET = 'secret-key';
const db = require('../models/index');
const User = db.User;
// let User = require('../models/userModel')
// let Sport = require('../models/sportModel')
// const sportList = require('./sportControllerApi');
// let userList = []
// let user1 = new User (1, "test", "test", "admin", [])
// userList.push(user1)

exports.userList = async function (req, res) {
  await User.findAll({ attributes: ['iduser','nom','email','password', 'role'] })
      .then(data => {
          console.log("All users:", JSON.stringify(data, null, 2));
          res.json(data);
      })
      .catch(err => {
          res.status(500).json({ message: err.message })
      })
}


exports.createAccount = async function (req, res) {
  let user = User.build({ nom: req.body.nom,email: req.body.email, password: req.body.password, role: req.body.role })
  await user.save()
      .then(data => {
          console.log(user.toJSON());
          res.json(data);
      })
      .catch(err => {
          res.status(500).json({ message: err.message })
      })
}


exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Rechercher l'utilisateur correspondant au pseudo fourni dans la base de données
    const user = await User.findOne({ where: { email } });

    // Vérifier si l'utilisateur existe et si le mot de passe est correct
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Authentification échouée" });
    }

    // Créer un token d'authentification et le renvoyer dans la réponse
    const token = jwt.sign({ iduser: user.iduser}, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


