let express = require('express');
// Importing the database 
const sequelize = require('./db.js');
const { Sequelize } = require('./models/index.js');
// Creating all the tables defined in user

let res = require('http').ServerResponse;
sequelize.sync();
let app = express();
const cors = require('cors');

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(function(req, res, next) {
    const origin = req.headers.origin;
    if (origin) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Credentials', 'true');
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
  
app.use(cors(corsOptions));
router = require('./routes');
app.use('/',router);

app.listen(3008, function(){
    console.log('Running on port 3008');
});
