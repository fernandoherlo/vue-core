module.exports = function(app, sequelize){

  const { Comment } = require('./_definitions')(sequelize);
  const { Inline } = require('./_definitions')(sequelize);

  app.get('/api/comments', async (req, res) => {
    Comment.findAll({
      include: [
        { model: Inline }
      ]
    }).then(comments => {
      res.send(comments);
    });
  });
  app.post('/api/comments', async (req, res) => {
    var name = req.body.name;
    Comment.create({ name: name }).then(commentSave => {
      Comment.findById(commentSave.id, {
        include: [
          { model: Inline }
        ]
      }).then(comment => {
        res.send(comment);
      });
    });
  });
  app.post('/api/comments/:id', async (req, res) => {
    var id = req.params.id;
    var name = req.body.name;
    Comment.update({ name: name },{ where: { id: id }}).then(count => {
      Comment.findById(id, {
        include: [
          { model: Inline }
        ]
      }).then(comment => {
        res.send(comment);
      })
    });
  });
  app.delete('/api/comments/:id', async (req, res) => {
    var id = req.params.id;
    Inline.destroy({ where: { id_parent: id }}).then(count => {
      Comment.destroy({ where: { id: id }}).then(count => {
        res.send('{}');
      });
    });
  });
}