({
  access: "public",
  method: async () => {
    const data = await domain.db.query(
      "SELECT filmid FROM films ORDER BY RANDOM() LIMIT(1)"
    );
    return { data: data.rows };
  },
});
