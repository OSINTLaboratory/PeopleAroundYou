'use strict';

const Core = require('../../core');

async function Catalog(req, res) {
  const query = req.db.sql();
  query.select(['filmid', 'title', 'year', 'rating', 'views', 'poster', 'genre'])
    .inTable('films');

  if (query.top !== undefined) {
    // Getting top 10 according rating
    query.order('rating DESC LIMIT 10');
  } else {
    query.order('title ASC');
  }

  if (query.word !== undefined) {
    // For search query
    query.where({ title: `*${req.query.word}*` });
  }

  await query.exec((err, result) => {
    if (err) {
      Core.log.warning(err);
      res.status(500).end();
      return;
    }
    res.send(JSON.stringify(result)).end();
  });
}
module.exports = Catalog;

