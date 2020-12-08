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
	this.pool.query('SELECT NOW()', (err, result) => {
		if (err) {
			return Core.log.warning('Database test connection ' + err);
		}
		Core.log.info('Database now: ' + JSON.stringify(result));	
	});
  }
   
  async init(){
			const init_sql = fs.readFileSync('init_db.sql').toString();
			return this.pool.query(init_sql, (err, result) => {
				if(err){
					return Core.log.warning('Database init ' + err);
				}
				Core.log.info('Database ready');
			});
  }
  sql() {
    return Sql(this.pool);
  }
};

module.exports = DB;
