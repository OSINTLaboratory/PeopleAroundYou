'use strict';

const Core = require('../../core');
const { hash } = require('../crypto');

async function Recommendations(req, res) {
  if (req.cookies === undefined) {
    res.status(200).end();
    return;
  }

  if (req.cookies['session'] === undefined) {
    res.status(200).end();
    return;
  }

  if (req.sessions_id[hash(JSON.stringify(req.useragent))] === undefined) {
    res.status(200).end();
    return;
  }

  if (req.sessions_id[hash(JSON.stringify(req.useragent))] !== req.cookies['session']) {
    res.status(200).end();
    return;
  }
  // Get current user login from session
  const login = req.sessions[req.sessions_id[hash(JSON.stringify(req.useragent))]];
  // Get list of films if viewed by current user
  let query = req.db.sql();
  query.select(['viewed'])
    .inTable('users')
    .where({ login: `=${login}` });
  await query.exec(async (err, result) => {
    if (err) {
      Core.log.warning(err);
      res.status(500).end();
      return;
    }
    if (!result[0]) {
      return;
    }
    const arrOfFilmIDs = result[0].viewed;
    console.log(arrOfFilmIDs);
    // Create map of genre->count of viewed by this user
    const viewed_genres_dat = new Object();
    for (const filmId of arrOfFilmIDs) {
      query = req.db.sql();
      query.select(['genre'])
        .inTable('films')
        .where({ filmid: parseInt(filmId) });
      await query.exec((err, result) => {
        if (err) {
          Core.log.warning(err);
          res.status(500).end();
          return;
        }
        if (result[0] === undefined) {
          return;
        }

        if (viewed_genres_dat[result[0].genre] === undefined) {
          viewed_genres_dat[result[0].genre] = 0;
        } else {
          viewed_genres_dat[result[0].genre]++;
        }
      });
    }

    // Search of max viewed genre
    const max_viewed_genre = {
      genre: 0,
      count: 0
    };
    for (const genre in viewed_genres_dat) {
      const count = viewed_genres_dat[genre];
      if (count > max_viewed_genre.count) {
        max_viewed_genre.count = count;
        max_viewed_genre.genre = genre;
      }
    }

    // Select first 3 film by rating with founded genre
    query = req.db.sql();
    query.select(['filmid', 'title', 'year', 'rating', 'views', 'poster', 'genre'])
      .inTable('films')
      .order('rating DESC LIMIT 3');
    await query.exec((err, result) => {
      if (err) {
        Core.log.warning(err);
        res.status(500).end();
        return;
      }
      res.send(JSON.stringify(result)).end();
    });
  });
}
module.exports = Recommendations;
