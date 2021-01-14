'use strict';

async function GetFilm(req, res) {
  const id = req.body.id;
  const query = req.db.sql();
  query.select(['filmid', 'title', 'year', 'rating', 'views', 'poster', 'genre'])
    .inTable('films')
    .where({ filmid: id });

  await query.exec((err, result) => {
    if (err) {
      Core.log.warning(err);
      res.status(500).end();
      return;
    }
    res.send(JSON.stringify(result)).end();
  });
}

module.exports = GetFilm;
