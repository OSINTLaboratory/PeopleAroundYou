async ({ id }) => {
  await domain.db.query("UPDATE comments SET approved=$1", id);
};
