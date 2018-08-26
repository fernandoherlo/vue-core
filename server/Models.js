module.exports = function(app, sequelize){
  // Comment
  // #######################################################
  require('./Models/Comment')(app, sequelize);
  // Post
  // #######################################################
  require('./Models/Post')(app, sequelize);
  // Inline
  // #######################################################
  require('./Models/Inline')(app, sequelize);
  // Relation
  // #######################################################
  require('./Models/Relation')(app, sequelize);
  // User
  // #######################################################
  require('./Models/User')(app, sequelize);
}