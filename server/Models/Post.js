module.exports = function(app, sequelize){

  const { Relation } = require('./_definitions')(sequelize);
  const { Post } = require('./_definitions')(sequelize);

  app.get('/api/posts', async (req, res) => {
    Post.findAll({
      include: [
        { model: Relation }
      ]
    }).then(posts => {
      res.send(posts);
    });
  });
  app.post('/api/posts', async (req, res) => {
    var name = req.body.name;
    Post.create({ name: name }).then(postSave => {
      Post.findById(postSave.id, {
        include: [
          { model: Relation }
        ]
      }).then(post => {
        res.send(post);
      });
    });
  });
  app.post('/api/posts/:id', async (req, res) => {
    var id = req.params.id;
    var name = req.body.name;
    Post.update({ name: name },{ where: { id: id }}).then(count => {
      Post.findById(id, {
        include: [
          { model: Relation }
        ]
      }).then(post => {
        res.send(post);
      })
    });
  });
  app.delete('/api/posts/:id', async (req, res) => {
    var id = req.params.id;
    Relation.destroy({ where: { id_relation: id }}).then(count => {
      Post.destroy({ where: { id: id }}).then(count => {
        res.send('{}');
      });
    });
  });
}