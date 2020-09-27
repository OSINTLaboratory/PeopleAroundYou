'use strict';

const { Pool } = require('pg');
const Sql = require('./sql');

const Core = require('../core');

class DB {
  constructor(config){
    if (!config) return Core.log.warning(new Error('0x0001'));

    this.pool = new Pool(config);
  }

  sql() {
    return Sql(this.pool);
  }

  close() {
    if (!pool) return Core.logerror.warning(new Error('0x0001'));
    yhis.pool.end();
  }
};

module.exports = DB;
