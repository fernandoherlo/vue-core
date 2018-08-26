// Server.js
// #######################################################
const express = require('express');
const jwt = require('express-jwt');
const serveStatic = require('serve-static')
const jwksRsa = require('jwks-rsa');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;

// DB
// #######################################################
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
   ssl: process.env.SSL === 'true'
});

// Express
// #######################################################
const app = express();

// Setup authentication
// #######################################################
const jwtCheck = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: process.env.URI_JWKS
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: process.env.URI_AUTH0,
  algorithms: ['RS256']
});
app.use('/api/*', jwtCheck);

// Config
// #######################################################
// Cors
var corsOptions = {
  origin: process.env.URL_CORS.split(','),
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
// Bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static
// #######################################################
app.use('/', serveStatic ( path.join (__dirname, '/dist') ) )

// Models
// #######################################################
require('./server/Models')(app, sequelize);
// All
app.get('*', function (req, res) {
    res.sendFile(__dirname + '/dist/index.html')
})

// Error AUTH handling
// #######################################################
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({error: 'invalid token...'});
  }
});

// Server + port
// #######################################################
app.listen(port);
console.log('Server started '+ port);