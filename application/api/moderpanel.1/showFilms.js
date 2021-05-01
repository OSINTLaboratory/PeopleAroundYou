async () => {
  const data = await domain.db.select("films", ["*"]);
  return { data };
};
