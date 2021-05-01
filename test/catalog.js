'use strict';
const metatests = require('metatests');
const { api, apiReady, fakeDomainContext } = require('./helpers');

metatests.test('api/catalog genres', async (test) => {
  await apiReady;

  const genres = api.catalog.genres;

  test.strictSame(typeof genres.method, 'function');
  test.strictSame(genres.access, 'public');

  genres.method();

  test.strictSame(fakeDomainContext.db.queryString, 'SELECT lable FROM genres');
  test.end(); 
});

metatests.test('api/catalog filter', async (test) => {
  await apiReady;
  const filter = api.catalog.filter;
  test.strictSame(typeof filter.method, 'function');
  test.strictSame(filter.access, 'public');

  filter.method({
	sort: 'RATING',
	yearFrom: '',
	yearTo: '',
	genre: 1
  });
	
  test.strictSame(fakeDomainContext.db.queryString, 'SELECT * FROM films WHERE genre=1 ORDER BY rating DESC');

  filter.method({
	sort: 'ALP_ASC',
	yearFrom: '',
	yearTo: '',
	genre: 99
  });
	
  test.strictSame(fakeDomainContext.db.queryString, 'SELECT * FROM films WHERE genre=99 ORDER BY title ASC');

  filter.method({
	sort: 'VIEWS',
	yearFrom: '1900',
	yearTo: '2000',
	genre: 4
  });
	
  test.strictSame(fakeDomainContext.db.queryString, 'SELECT * FROM films WHERE genre=4 AND year<2000 AND year>1900 ORDER BY views ASC');
  
  filter.method({
	sort: 'YEAR_ASC',
	yearFrom: '2015',
	yearTo: '2017',
	genre: 2
  });
	
  test.strictSame(fakeDomainContext.db.queryString, 'SELECT * FROM films WHERE genre=2 AND year<2017 AND year>2015 ORDER BY year ASC');
  
  test.end();
});

