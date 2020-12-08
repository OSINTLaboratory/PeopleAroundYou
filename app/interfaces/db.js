'use strict';

const { Pool } = require('pg');
const Sql = require('./sql');

const Core = require('../core');

class DB {
  constructor(config){	
	Core.log.info("Initializing database");
	Core.log.info("Database config: " + JSON.stringify(config));
    this.pool = new Pool(config);
	Core.log.info("Pool created");
	this.pool.query('SELECT NOW()', (err, result) => {
	  if (err) {
		return Core.log.warning('Database test connection ' + err);
	  }
		Core.log.info('Database ready');
		Core.log.info('Database now: ' + result);
	});
  }

  sql() {
    return Sql(this.pool);
  }
};

module.exports = DB;
