const Genres = async (req, res) => {
  const query = req.db.sql();
  query.select(['lable'])
    .inTable('genres')
    .order('genreid');
  await query.exec((err, result) => {
    if(err){
      Core.log.warning(err);
      res.status(500).end();
      return;
    }
    res.send(JSON.stringify(result)).end();
  });
};

module.exports = Genres;