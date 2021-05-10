'use strict';
const metatests = require('metatests');
const { api, apiReady, fakeDomainContext } = require('./helpers');

metatests.test('api/player getFilm', async (test) => {
  await apiReady;

  const getFilms = api.player.getFilm;

  test.strictSame(typeof getFilms.method, 'function');
  test.strictSame(getFilms.access, 'public');

  getFilms.method(4);

  test.strictSame(fakeDomainContext.db.queryString, 'SELECT * FROM films WHERE \'filmid\'=$1');
  test.end(); 
});

metatests.test('api/player getCommentsForFilm', async (test) => {
  await apiReady;

  const getCommentsForFilm= api.player.getCommentsForFilm;

  test.strictSame(typeof getCommentsForFilm.method, 'function');
  test.strictSame(getCommentsForFilm.access, 'public');

  getCommentsForFilm.method(4);

  test.strictSame(fakeDomainContext.db.queryString, 'SELECT userid,textdata FROM comments WHERE \'filmid\'=$1');
  test.end(); 
});
