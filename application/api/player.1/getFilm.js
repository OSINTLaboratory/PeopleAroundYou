({
  access: "public",
  method: async ({ filmid }) => {
    const data = await domain.db.select("films", ["*"], { filmid });
    return { data };
  },
});
