const Core = require("../../core");
const {hash} = require("../crypto");

async function Register(req, res){
  const salt = req.body.email;
  const query = req.db.sql();
  query.insert({
    login: req.body.email,
    hash: hash(req.body.password + salt)
  })
    .inTable('users');
  await query.exec((err) => {
    if (err) {
      Core.log.warning(err);
      res.status(500).end();
      return;
    }
    res.status(200).end();
  });
}

module.exports = Register;