'use strict';
const Core = require('../core');

const where = conditions => {
  const clause = [];
  const args = [];
  let i = 1;
  for (const key in conditions) {
    let value = conditions[key];
    let condition;
    if (typeof value === 'number') {
      condition = `${key} = $${i}`;
    } else if (typeof value === 'string') {
      if (value.startsWith('>=')) {
        condition = `${key} >= $${i}`;
        value = value.substring(2);
      } else if (value.startsWith('<=')) {
        condition = `${key} <= $${i}`;
        value = value.substring(2);
      } else if (value.startsWith('<>')) {
        condition = `${key} <> $${i}`;
        value = value.substring(2);
      } else if (value.startsWith('>')) {
        condition = `${key} > $${i}`;
        value = value.substring(1);
      } else if (value.startsWith('<')) {
        condition = `${key} < $${i}`;
        value = value.substring(1);
      } else if (value.includes('*') || value.includes('?')) {
        value = value.replace(/\*/g, '%').replace(/\?/g, '_');
        condition = `${key} LIKE $${i}`;
      } else {
        condition = `${key} = $${i}`;
      }
    }
    i++;
    args.push(value);
    clause.push(condition);
  }
  const sclause = clause.join(' AND ');
  return { sclause,
    args };
};

const MODE_ROWS = 0;
const MODE_VALUE = 1;
const MODE_ROW = 2;
const MODE_COL = 3;
const MODE_COUNT = 4;

const sql = (pool) => {
  const sql = '';
  const op = null;
  const table = null;
  const cols = null;
  const rows = null;
  const rowCount = 0;
  const ready = false;
  const mode = MODE_ROWS;
  const whereClause = undefined;
  const _fields = new Array;
  const args = new Array;
  const orderBy = undefined;

  return {
    pool,

    sql,
    op,
    table,
    cols,
    rows,
    rowCount,
    ready,
    mode,
    whereClause,
    _fields,
    args,
    orderBy,

    select() {
      this.op = this.buildSelect;
      return this;
    },

    insert() {
      this.op = this.buildInsert;
      return this;
    },

    remove() {
      this.op = this.buildDelete;
      return this;
    },
	
	fields(values) {
      for (const key of values) {
        this._fields.push(key);
      }
	},
	
    values(values) {
      this.mode = MODE_ROW;
      for (const key in values) {
        this._fields.push(key);
        this.args.push(values[key]);
      }
      return this;
    },

    where(conditions) {
      const { sclause, args } = where(conditions);
      this.whereClause = sclause;
      this.args = args;
      return this;
    },

    inTable(table) {
      this.table = table;
      return this;
    },

    value(val) {
      this.mode = MODE_VALUE;
      this._fields = new Array;
      this._fields.push(val);
      return this;
    },

    row() {
      this.mode = MODE_ROW;
      return this;
    },

    col(name) {
      this.mode = MODE_COL;
      this.columnName = name;
      return this;
    },

    count() {
      this.mode = MODE_COUNT;
      return this;
    },

    order(name) {
      this.orderBy = name;
      return this;
    },

    buildSelect() {
      const { table, _fields, args } = this;
      const { whereClause, orderBy, columnName } = this;
      const flds = _fields.join(', ');
      let sql = `SELECT ${flds} FROM ${table}`;
      if (whereClause) sql += ` WHERE ${whereClause}`;
      if (orderBy) sql += ` ORDER BY ${orderBy}`;
      this.sql = { sql,
        values: args };
    },

    buildInsert() {
      const { table, _fields, args } = this;
      const flds = _fields.join(', ');
      const vals = new Array;
	  let i = 1;
	  for(const item of _fields){
		  vals.push(`$${i}`);
		  i++;
	  }
	  const vls = vals.join(', ');
      const sql = `INSERT INTO ${table}(${flds}) VALUES (${vals})`;
      this.sql = { sql,
        values: args };
    },
	
    buildDelete() {
		
    },

    async exec(callback) {
      // TODO: store callback to pool

	  this.op();

      const { sql, values } = this.sql;
		
	  console.log(sql, values);
	  
	  this.pool.query(sql, values, (err, res) => {
        if (callback) {
		  if(res === undefined){
			  callback(err, undefined);
			  return;
		  }
          const mode = this.mode;
          this.rows = res.rows;
          this.cols = res.fields;
          this.rowCount = res.rowCount;
          const { rows, cols } = this;
		  console.dir(rows, cols);
          if (mode === MODE_VALUE) {
            const col = cols[0];
            const row = rows[0];
			if(row === undefined){
				callback(err, undefined);
			} else {
				callback(err, row[col.name]);
			}
          } else if (mode === MODE_ROW) {
            callback(err, rows[0]);
          } else if (mode === MODE_COL) {
            const col = [];
            for (const row of rows) {
              col.push(row[columnName]);
            }
            callback(err, col);
          } else if (mode === MODE_COUNT) {
            callback(err, this.rowCount);
          } else if (mode === MODE_ROWS) {
            callback(err, rows);
          }
        }
      });
    }
  };
};

module.exports = sql;
