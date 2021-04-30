({
  access: "public",
  method: async ({ filmid }) => {
    const fields = ["userid", "textdata"];
    const where = { filmid };
    const data = await domain.db.select("comments", fields, where);
    return { data };
  },
});
