async () => {
  const data = await domain.db.select("comments", ["*"]);
  return { data };
};
