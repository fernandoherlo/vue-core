module.exports = function(app, sequelize){

  const { Relation } = require('./_definitions')(sequelize);
  const { Post } = require('./_definitions')(sequelize);

  app.get('/api/relations', async (req, res) => {
    Relation.findAll({
      include: [
        { model: Post }
      ]
    }).then(relations => {
      res.send(relations);
    });
  });
  app.post('/api/relations', async (req, res) => {
    var id_parent = req.body.id_parent;
    var id_relation = req.body.id_relation;
    Relation.create({ id_parent: id_parent, id_relation: id_relation }).then(relationSave => {
      Relation.findById(relationSave.id, {
        include: [
          { model: Post }
        ]
      }).then(relation => {
        res.send(relation);
      });
    });
  });
  app.post('/api/relations/:id', async (req, res) => {
    var id = req.params.id;
    var id_parent = req.body.id_parent;
    var id_relation = req.body.id_relation;
    Relation.update({ id_parent: id_parent, id_relation: id_relation },{ where: { id: id }}).then(count => {
      Relation.findById(id, {
        include: [
          { model: Post }
        ]
      }).then(relation => {
        res.send(relation);
      })
    });
  });
  app.delete('/api/relations/:id', async (req, res) => {
    var id = req.params.id;
    Relation.destroy({ where: { id: id }}).then(count => {
      res.send('{}');
    })
  });
}