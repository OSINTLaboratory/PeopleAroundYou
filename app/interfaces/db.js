'use strict';

const { Pool } = require('pg');
const Sql = require('./sql');
const fs = require('fs');

const Core = require('../core');

class DB {
  constructor(config) {
    Core.log.info('Connecting to the database');
    this.pool = new Pool(config);
    Core.log.info('Pool created');
    Core.log.info('Test connection');
    this.isReady = this.pool.query('SELECT NOW();')
      .then(() => {
        Core.log.info('Connection established');
      }).catch(err => Core.log.warning('Database not connected ' + err));
  }
  
  Pool() {
    return this.pool;
  }
  
  sql() {
    return Sql(this.pool);
  }
}

module.exports = DB;
