({
  access: "public",
  method: async ({ sort, yearFrom, yearTo, genre }) => {
    let query = "SELECT * FROM films";

    query += ` WHERE genre=${parseInt(genre)}`;
    if (yearTo !== "") {
      query += ` AND year<${yearTo}`;
    }
    if (yearFrom !== "") {
      query += ` AND year>${yearFrom}`;
    }

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
    const data = await domain.db.query(query);
    return { data: data.rows };
  },
});
