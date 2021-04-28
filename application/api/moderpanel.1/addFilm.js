async ({ poster, url, title, genre }) => {
  const movie = url;
  const posterType = poster.mimetype;
  const movieType = movie.mimetype;
  const posterName =
    title + `.${posterType.slice(posterType.indexOf("/") + 1)}`;
  const movieName = title + `.${movieType.slice(movieType.indexOf("/") + 1)}`;

  poster.mv("../posters/" + posterName);
  movie.mv("../films/" + movieName);

  const fields = ["genreid"];
  const where = { lable: genre };
  const data = await domain.db.select("genres", fields, where);

  console.log(data);
  console.log(data[0].genreid);

  await domain.db.insert("films", {
    title: req.body.title,
    year: +req.body.year,
    poster: posterName,
    genre: data[0].genreid,
    free: !!req.body.free,
    url: movieName,
  });
};
