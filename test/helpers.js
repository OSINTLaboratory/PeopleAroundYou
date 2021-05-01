'use strict';

const metatests = require('metatests');
const metavm = require('metavm');
const node = { process };
node.fs = require('fs');
const fsp = node.fs.promises;

const root = `${process.cwd()}/application/api/`;

const fakeDomainContext = {
    db: {
      queryString: undefined,
      values: undefined,
      select(table, fields, where) {
	this.values = new Array();
        this.queryString = `SELECT ${fields.join(',')} FROM ${table}`;
	if(where) {
	  const keys = Object.keys(where);
	  this.queryString += ` WHERE '${keys[0]}'=$${1}`;
	  this.values.push(where[keys[0]]);
	  for(let i = 1; i < keys.length; i++) {
	    this.queryString += ` AND '${keys[i]}'=$${i+1}`;
	    this.values.push(where[keys[i]]);
	  }
	}
      },
      query(q, v) {
	this.queryString = q;
	this.values = v;
	return { rows:{} };
      }
    }
}

const createScript = async (fileName) => {
  try {
      const code = await fsp.readFile(fileName, 'utf8');
      if (!code) return null;
      const src = 'context => ' + code;
      const options = { context: metavm.createContext({ process, domain: fakeDomainContext }) };
      const { exports } = new metavm.MetaScript(fileName, src, options);
      return exports();
  } catch (err) {
    if(err.code !== 'ENOENT') {
      console.error(fileName, err);
    }
      return null;
  }
}

let api = {};

const loadApi = async (module) => {
  api[module] = {};
  const modules = await fsp.readdir(root);
  for(let m of modules) {
    if(m.split('.')[0] !== module) continue;
      const files = await fsp.readdir(root + m);
      for(let file of files) {
        if(file.startsWith('.')) continue; 
        const fileName = file.split('.')[0];
        api[module][fileName] = await createScript(root + m + '/' + file);
      }
     return;
  }
}

module.exports = { api, loadApi, fakeDomainContext };
