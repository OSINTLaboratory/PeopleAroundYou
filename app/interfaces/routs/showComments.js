'use strict';

async function ShowComments(req, res) {
  const query = req.db.sql();

  query.select(['commentid', 'filmid', 'userid', 'textdata', 'approved'])
    .inTable('comments');

  await query.exec((err, result) => {
    if (err) {
      Core.log.warning(err);
      res.status(500).end();
      return;
    }
    res.send(JSON.stringify(result)).end();
  });
}

module.exports = ShowComments;
