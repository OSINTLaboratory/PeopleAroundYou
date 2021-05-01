async ({ id }) => {
  await domain.db.query("DELETE FROM films WHERE filmid=$1", id);
};
