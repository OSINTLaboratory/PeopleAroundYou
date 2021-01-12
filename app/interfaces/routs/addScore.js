const Core = require("../../core");

async function AddScore(req, res){
  let query = req.db.sql();
  query.select(['rating', 'rating_count'])
    .inTable('films').where({ filmid:`=${req.body.id}` });

  await query.exec( async (err, result) => {
    if (err) {
      Core.log.warning(err);
      res.status(500).end();
      return;
    }
    let new_rating = parseFloat(req.body.rating);
    let rating = parseFloat(result[0].rating);
    let count = parseInt(result[0].rating_count);

    rating = rating / count;
    new_rating = (new_rating + rating) / 2;
    new_rating += rating;

    let query = req.db.sql();
    query.update('rating')
      .inTable('films')
      .set(new_rating)
      .where({ filmid: `=${req.body.id}` });

    await query.exec(async err => {
      if (err) {
        Core.log.warning(err);
        res.status(500).end();
        return;
      }
      let query = req.db.sql();
      query.update('rating_count')
        .inTable('films')
        .set(count + 1)
        .where({ filmid: `=${req.body.id}` });

      await query.exec(async err => {
        if (err) {
          Core.log.warning(err);
          res.status(500).end();
          return;
        }

        res.status(200).end();
      });
    });
  });
}

module.exports = AddScore;