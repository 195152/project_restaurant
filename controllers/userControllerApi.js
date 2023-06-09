const jwt = require('jsonwebtoken');
process.env.JWT_SECRET = 'secret-key';
const db = require('../models/index');
const User = db.User;

exports.userList = async function (req, res) {
  await User.findAll({ attributes: ['iduser','nom','email','password', 'role'] })
      .then(data => {
          res.json(data);
      })
      .catch(err => {
          res.status(500).json({ message: err.message })
      })
}


exports.createAccount = async function (req, res) {
  let user = User.build({ nom: req.body.nom,email: req.body.email, password: req.body.password, role: "regularUser" })
  await user.save()
      .then(data => {
        console.log(data)
          res.json(data);
      })
      .catch(err => {
          res.status(500).json({ message: err.message })
      })
}


exports.login = async (req, res) => {
  const { email, password } = req.body.user;
  try {
    // Rechercher l'utilisateur correspondant au pseudo fourni dans la base de données
    const user = await User.findOne({ where: { email } });

    // Vérifier si l'utilisateur existe et si le mot de passe est correct
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Authentification échouée" });
    }
    // Créer un token d'authentification et le renvoyer dans la réponse
    const token = jwt.sign({ iduser: user.iduser, role: user.role, name: user.nom, email: user.email}, "nowfood");
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

