'use strict';

const Core = require('../../core');

async function Random(req, res) {
  const query = req.db.sql();

  query.select(['filmid']);
  query.inTable('films');
  query.order('RANDOM() LIMIT(1)');

  await query.exec(async (err, result) => {
    if (err) {
      Core.log.warning(err);
      res.status(500).end();
      return;
    }
    res.send(result[0].filmid.toString()).end();
  });
}

module.exports = Random;
