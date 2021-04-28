({
  access: "public",

  method: async ({ filmid }) => {
    const data = await domain.db.select("genres", ["*"], { filmid });
    return { data };
  },
});
