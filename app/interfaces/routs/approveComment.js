async function ApproveComment(req, res){
  if (req.moder_perm) {
    const query = req.db.sql();

    query.update('approved')
      .inTable('comments')
      .set(true)
      .where({ commentid: `=${req.body.id}` });

    await query.exec(err => {
      if (err) {
        Core.log.warning(err);
        res.status(500).end();
        return;
      }

      res.status(200).end();
    });
  } else {
    res.status(403).end();
  }
}

module.exports = ApproveComment;