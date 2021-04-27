const Task = require('./framework/task');
const { assert } = require('./framework/helper');
const Database = require('../app/interfaces/db');

const fakeDB = () => new Database({
   connectionString: `postgresql://${process.env.USER}:${process.env.USER}@localhost:5432/application`,
   ssl: false
});

const fakeCatalogEndpoint = (callback) => {
  const db = fakeDB();

  let result;
  db.isReady.then(async () => {
    const Catalog = require('../app/interfaces/routs/catalog.js');
    const req = { db };
    const res = {
      status(){
        return {
          end(){}
        }
      },
      send(data){
        callback(data);
	return {
	  end(){}
        }
      }
    };
    Catalog(req, res);
  });
}

const fakeCatalogFiltering = (reqData, callback) => {
  const db = fakeDB();

  let result;
  db.isReady.then(async () => {
    const Filter = require('../app/interfaces/routs/filter.js');
    const req = { db };
    req.body = reqData;
    const res = {
      status(){
        return {
          end(){}
        }
      },
      send(data){
        callback(data);
	return {
	  end(){}
        }
      }
    };
    Filter(req, res);
  });
}

module.exports = [
  new Task(
	  'Test access to root page',
	  'get', '/',
	  res => assert(res.statusCode, 200)
  ),
  new Task(
	  'Test default catalog api',
	  'POST', '/catalog', 
	  res => assert(res.statusCode, 200)
  ),
  new Task(
	  'Test search across catalog',
	  'post', '/catalog?word=some%20search%20query',
	  res => assert(res.statusCode, 200)
  ),
  new Task(
	  'Test catalog top 10 post query',
	  'post', '/catalog?top=""', 
	  res => assert(res.statusCode, 200)
  ),
  new Task(
	  'Test isLogin endpoint accessing',
	  'post', '/isLogin',
	  res => assert(res.statusCode, 200)
  ),
  new Task(
	  'Test is current user login in',
	  'post', '/isLogin', 
	  (res, data) => assert(data, 'false'),
  ),
  new Task(
	  'Test catalog filtering by default',
	  'post', '/filter', 
	  (res, data1) => fakeCatalogFiltering( 
		{genre:1, sort:'RATING'},
		data2 => assert(data1, data2)
	  ),
	  '{"genre":1,"sort":"RATING"}'
  ),
  new Task(
	  'Test valid catalog filtering data by years',
	  'post', '/filter', 
	  (res, data1) => fakeCatalogFiltering( 
		{genre:1, year_from:2015,year_up:3000,sort:'RATING'},
		data2 => assert(data1, data2)
	  ),
	  '{"genre":1,"year_from":2015,"year_up":3000,"sort":"RATING"}'
  ),
  new Task(
	  'Test catalog default data',
	  'post', '/catalog',
	  (res, data1) => fakeCatalogEndpoint( data2 => assert(data1, data2))
  ),
];

