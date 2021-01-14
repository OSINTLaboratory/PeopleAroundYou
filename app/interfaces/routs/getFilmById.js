'use strict';

const Core = require('../../core');

async function GetFilmById(req, res) {
  const id = parseInt(req.body.id);

  const query = req.db.sql();
  query.select(['filmid', 'title', 'year', 'rating', 'rating_count', 'views', 'genre'])
    .inTable('films').where({ filmid: `=${id}` });

  await query.exec(async (err, result) => {
    if (err) {
      Core.log.warning(err);
      res.status(500).end();
      return;
    }
    const data = result[0];
    const query = req.db.sql();
    query.select(['lable'])
      .inTable('genres').where({ genreid: `=${result[0].genre}` });

    await query.exec((err, result) => {
      if (err) {
        Core.log.warning(err);
        res.status(500).end();
        return;
      }
      data.genre = result[0].lable;
      res.send(JSON.stringify(data)).end();
    });
  });
}

module.exports = GetFilmById;
