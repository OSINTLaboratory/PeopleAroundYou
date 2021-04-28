({
  access: "public",
  method: async ({ sort, yearFrom, yearTo, genre }) => {
    let query = "SELECT * FROM films";

    if (sort === "RATING") {
      query += " ORDER BY rating DESC";
    } else if (sort === "ALP_ASC") {
      query += " ORDER BY title ASC";
    } else if (sort === "ALP_DESC") {
      query += " ORDER BY title DESC";
    } else if (sort === "YEAR_DESC") {
      query += " ORDER BY year DESC";
    } else if (sort === "YEAR_ASC") {
      query += " ORDER BY year ASC";
    } else if (sort === "VIEWS") {
      query += " ORDER BY views ASC";
    }

    if (year_to !== "") {
      query += ` WHERE year<${req.body.year_to}`;
    }
    if (year_from !== "") {
      query += ` WHERE year>${req.body.year_from}`;
    }
    if (genre !== "") {
      query += ` WHERE genre=${parseInt(req.body.genre)}`;
    }

    const data = await domain.db.query(query);
    return { data };
  },
});
