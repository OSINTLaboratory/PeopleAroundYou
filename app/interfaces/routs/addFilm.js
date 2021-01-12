const Core = require("../../core");

async function AddFilm(req, res){
  const poster = req.files.poster;
  const movie = req.files.url;
  const posterType = poster.mimetype;
  const movieType  =  movie.mimetype;
  const posterName = req.body.title + `.${posterType.slice(posterType.indexOf('/') + 1)}`;
  const movieName = req.body.title + `.${movieType.slice(movieType.indexOf('/') + 1)}`;

  poster.mv('app/interfaces/html/posters/' + posterName);
  movie.mv('app/interfaces/html/films/' + movieName);

  let genre;
  const genreQuery = req.db.sql();
  genreQuery.select(['genreid']).inTable('genres').where({ lable: `=${req.body.genre}` });
  await genreQuery.exec(async (err, result) => {
    if (err) {
      Core.log.warning(err);
      res.status(500).end();
      return;
    }

    genre = result[0].genreid;

    const query = req.db.sql();
    query.insert({
      title: req.body.title,
      year: +req.body.year,
      poster: posterName,
      genre,
      free: !!req.body.free,
      url: movieName,
    }).inTable('films');

    await query.exec((err) => {
      if (err) {
        Core.log.warning(err);
        res.status(500).end();
        return;
      }
      res.status(200).end();
    });
  })
}

module.exports = AddFilm;