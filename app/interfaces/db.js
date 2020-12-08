'use strict';

const { Pool } = require('pg');
const Sql = require('./sql');
const fs = require('fs');

const Core = require('../core');

class DB {
  constructor(config){	
	Core.log.info("Initializing database");
	Core.log.info("Database config: " + JSON.stringify(config));
    this.pool = new Pool(config);
	Core.log.info("Pool created");
	Core.log.info('Test connection');
	let result = this.pool.query('SELECT NOW()');
	if (!result.length) {
		return Core.log.warning('Database not connected');
	}
	Core.log.info('Connection established');
	
	const init_sql = fs.readFileSync('app/interfaces/init_db.sql').toString();
	result = this.pool.query(init_sql);
	if (!result.length) {
		Core.log.warning('Database init error');
	}
	Core.log.info('Database ready');
  }
  
  sql() {
    return Sql(this.pool);
  }
};

module.exports = DB;
