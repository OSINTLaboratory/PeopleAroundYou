async ({ rating, filmid }) => {
  const fields = ["rating", "rating_count"];
  const where = { filmid };
  const data = await domain.db.select("films", fields, where);

  console.log(data);
  console.log(data[0]);

  let new_rating = parseFloat(rating);
  const old_rating = parseFloat(result[0].rating);
  const count = parseInt(result[0].rating_count);

  rating /= count;
  new_rating = (new_rating + old_rating) / 2;
  new_rating += old_rating;
  count++;

  await domain.db.query(
    "UPDATE films SET rating=$1, rating_count=$2 WHERE filmid=$3",
    count,
    new_rating,
    filmid
  );
};
