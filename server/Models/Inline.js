module.exports = function(app, sequelize){

  const { Comment } = require('./_definitions')(sequelize);
  const { Inline } = require('./_definitions')(sequelize);

  app.get('/api/inlines', async (req, res) => {
    Inline.findAll({
      include: [
        { model: Comment }
      ]
    }).then(inlines => {
      res.send(inlines);
    });
  });
  app.post('/api/inlines', async (req, res) => {
    var name = req.body.name;
    var id_parent = req.body.id_parent;
    Inline.create({ name: name, id_parent: id_parent }).then(inlineSave => {
      Inline.findById(inlineSave.id, {
        include: [
          { model: Comment }
        ]
      }).then(inline => {
        res.send(inline);
      });
    });
  });
  app.post('/api/inlines/:id', async (req, res) => {
    var id = req.params.id;
    var name = req.body.name;
    var id_parent = req.body.id_parent;
    Inline.update({ name: name, id_parent: id_parent },{ where: { id: id }}).then(count => {
      Inline.findById(id, {
        include: [
          { model: Comment }
        ]
      }).then(inline => {
        res.send(inline);
      })
    });
  });
  app.delete('/api/inlines/:id', async (req, res) => {
    var id = req.params.id;
    Inline.destroy({ where: { id: id }}).then(count => {
      res.send('{}');
    })
  });
}