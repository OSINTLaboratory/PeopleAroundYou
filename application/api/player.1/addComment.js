async ({ filmid, userid, textdata }) => {
  await domain.db.insert("comments", {
    filmid,
    userid,
    textdata,
  });
};
