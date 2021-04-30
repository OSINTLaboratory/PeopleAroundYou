({
  access: "public",
  method: async ({ title }) => {
    const data = await domain.db.query(
      "SELECT * FROM films WHERE title LIKE $1",
      ["%" + title + "%"]
    );
    return { data: data.rows };
  },
});
