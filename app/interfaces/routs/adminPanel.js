'use strict';

const Core = require('../../core');
const { hash } = require('../crypto');

async function AdminPanel(req, res) {
  console.log(req.body);
  const salt = req.body.email;
  const query = req.db.sql();
  const table = req.body.role === 'Администратор' ? 'administrators' : 'moderators';
  query.insert({
    login: req.body.email,
    hash: hash(req.body.password + salt)
  })
    .inTable(table);

  await query.exec((err, result) => {
    if (err) {
      Core.log.warning(err);
      res.status(500).end();
      return;
    }
    res.status(200).end();
  });
}

module.exports = AdminPanel;
