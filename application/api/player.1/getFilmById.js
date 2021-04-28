({
  access: "public",
  method: async ({ filmid }) => {
    const id = parseInt(req.body.id);

    const data = await domain.db.select("films", ["genre"], { filmid });

    const data2 = await domain.db.select("genres", ["lable"], {
      genreid: data[0].genre,
    });
    return { data: { genre: data2[0].lable } };
  },
});
