'use strict';

const Core = require('../../core');

async function ShowFilms(req, res) {
  const query = req.db.sql();

  query.select(['filmid', 'title', 'year', 'rating', 'views', 'poster', 'genre', 'free', 'url'])
    .inTable('films');

  await query.exec((err, result) => {
    if (err) {
      Core.log.warning(err);
      res.status(500).end();
      return;
    }
    res.send(JSON.stringify(result)).end();
  });
}

module.exports = ShowFilms;
