({
  access: "public",
  method: async ({ userid }) => {
    const data = await domain.db.select("SystemUser", ["login"], { userid });
    return { data };
  },
});
