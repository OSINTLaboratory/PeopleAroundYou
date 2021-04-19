const Task = require('./framework/task');
const { assert } = require('./framework/helper');
const Database = require('../app/interfaces/db');

const fakeCatalogEndpoint = (callback) => {
  const username = process.env.USER;
  const db = new Database({
      connectionString: `postgresql://${username}:${username}@localhost:5432/application`,
      ssl: false
  });

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
	  'Test catalog default data',
	  'post', '/catalog',
	  (res, data1) => fakeCatalogEndpoint( data2 => assert(data1, data2))
  ),
];

