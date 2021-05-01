async ({ id }) => {
  await domain.db.query("DELETE FROM comments WHERE commentid=$1", id);
};
