const ManagementClient = require('auth0').ManagementClient;
// Auth0
var auth0 = new ManagementClient({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  // scope: 'read:users update:users'
});

// NOTE: http://auth0.github.io/node-auth0/module-management.ManagementClient.html#getUsers

module.exports = function(app, sequelize){

  const { Relation } = require('./_definitions')(sequelize);

  app.get('/api/users', async (req, res) => {
    auth0.getUsers((err, users) => {
      if (err) {
        res.send(err);
      }
      // Add ID
      usersWID = [];
      users.forEach(function(user) {
        user.id = user.identities[0].user_id;
        user.role = user.app_metadata.role;
        usersWID.push(user);
      });
      res.send(usersWID);
    });
  });
  app.post('/api/users', async (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    var role = req.body.role;
    var data = {
      'email': email,
      'password': password,
      'connection': 'Username-Password-Authentication',
      'email_verified': true,
      'verify_email': false,
      'app_metadata': {
        'role': role
      }
    };
    auth0.createUser(data, (err, user) => {
      if (err) {
        res.send(err);
      }
      // Add ID
      user.id = user.identities[0].user_id;
      user.role = user.app_metadata.role;
      res.send(user);
    });
  });
  app.post('/api/users/:id', async (req, res) => {
    var id = req.params.id;
    var password = req.body.password;
    var role = req.body.role;
    var data = {
      'password': password,
      'connection': 'Username-Password-Authentication',
      'app_metadata': {
        'role': role
      }
    };
    var params = { id: 'auth0|' + id };
    auth0.updateUser(params, data, (err, user) => {
      if (err) {
        res.send(err);
      }
      // Add ID
      user.id = user.identities[0].user_id;
      user.role = user.app_metadata.role;
      res.send(user);
    });
  });
  app.delete('/api/users/:id', async (req, res) => {
    var id = req.params.id;
    var params = { id: 'auth0|' + id };
    Relation.destroy({ where: { id_parent: id }}).then(count => {
      auth0.deleteUser(params, function (err) {
        if (err) {
          res.send(err);
        }
        res.send('{}');
      });
    });
  });
}