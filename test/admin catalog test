'use strict';
const metatests = require('metatests');
const { api, apiReady, fakeDomainContext } = require('./helpers');


metatests.test('api/admin catalog filter', async (test) => {
  await apiReady;
  const filter = api.catalog.filter;
  test.strictSame(typeof filter.method, 'function');
  test.strictSame(filter.access, 'public');

  filter.method({
    sort: 'RATING',
    yearFrom: '',
    yearTo: '',
    genre: 9
  });

  test.strictSame(fakeDomainContext.db.queryString, 'SELECT * FROM films WHERE genre=9 ORDER BY rating DESC');

  filter.method({
    sort: 'VIEWS',
    yearFrom: '2000',
    yearTo: '2020',
    genre: 9
  });

  test.strictSame(fakeDomainContext.db.queryString, 'SELECT * FROM films WHERE genre=9 AND year<2020 AND year>2000 ORDER BY views ASC');

  filter.method({
    sort: 'YEAR_ASC',
    yearFrom: '2000',
    yearTo: '2020',
    genre: 9
  });

  test.strictSame(fakeDomainContext.db.queryString, 'SELECT * FROM films WHERE genre=9 AND year<2020 AND year>2000 ORDER BY year ASC');

  test.end();
});

