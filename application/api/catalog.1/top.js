({
  access: "public",
  method: async () => {
    const data = await domain.db.query(
      "SELECT * FROM films ORDER BY rating LIMIT(5)"
    );
    return { data };
  },
});
