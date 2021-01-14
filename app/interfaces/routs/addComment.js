'use strict';

const Core = require('../../core');

async function AddComments(req, res) {
  const query = req.db.sql();
  query.insert({
    filmid: req.body.filmid,
    userid: req.userid,
    textdata: req.body.textdata,
  }).inTable('comments');

  await query.exec(err => {
    if (err) {
      Core.log.warning(err);
      res.status(500).end();
      return;
    }

    res.status(200).end();
  });
}

module.exports = AddComments;
