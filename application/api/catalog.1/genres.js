({
  access: "public",
  method: async () => {
    const data = await domain.db.select("genres", ["lable"]);
    return { data };
  },
});
