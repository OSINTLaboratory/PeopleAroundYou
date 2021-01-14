'use strict';

const Core = require('../../core');

async function GetUsername(req, res) {
  const query = req.db.sql();

  query.select(['login'])
    .inTable('users')
    .where({ userid: `=${req.body.id}` });

  await query.exec((err, result) => {
    if (err) {
      Core.log.warning(err);
      res.status(500).end();
      return;
    }

    res.send(JSON.stringify(result)).end();
  });

}

module.exports = GetUsername;
