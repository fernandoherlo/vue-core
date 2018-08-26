const Sequelize = require('sequelize');

module.exports = function(sequelize){

  // Comment
  const Comment = sequelize.define('comment', {
    id: { type: Sequelize.INTEGER, unique: true, primaryKey: true, autoIncrement: true },
    name: Sequelize.STRING
  }, {
    timestamps: false
  });

  // Inline
  const Inline = sequelize.define('inline', {
    id: { type: Sequelize.INTEGER, unique: true, primaryKey: true, autoIncrement: true },
    name: Sequelize.STRING,
    id_parent: Sequelize.INTEGER
  }, {
    timestamps: false
  });

  // Associations
  Comment.hasMany(Inline, {foreignKey: 'id_parent', sourceKey: 'id'});
  Inline.belongsTo(Comment, {foreignKey: 'id_parent', targetKey: 'id'});

  // Post
  const Post = sequelize.define('post', {
    id: { type: Sequelize.INTEGER, unique: true, primaryKey: true, autoIncrement: true },
    name: Sequelize.STRING
  }, {
    timestamps: false
  });

  // Relation
  const Relation = sequelize.define('relation', {
    id: { type: Sequelize.INTEGER, unique: true, primaryKey: true, autoIncrement: true },
    id_parent: Sequelize.STRING,
    id_relation: Sequelize.INTEGER
  }, {
    timestamps: false
  });

  // Associations
  Post.hasMany(Relation, {foreignKey: 'id_relation', sourceKey: 'id'});
  Relation.belongsTo(Post, {foreignKey: 'id_relation', targetKey: 'id'});

  return {
    Comment,
    Inline,
    Post,
    Relation
  }
}