({
  access: "public",
  method: async ({ title }) => {
    const data = await domain.db.select("films", ["*"], { title });
    return { data };
  },
});
