'use strict';

const Http = require('./app/interfaces/http');
const Database = require('./app/interfaces/db');

// Класс обьеденяющий работу всех интерфейсов в приложение
class App {
  constructor() {
    this.interfaces = new Object();
  }

  // старт приложения
  start() {
    this.interfaces.http = new Http(process.env.PORT || 80);
	this.interfaces.db = new Database({
		connectionString: process.env.DATABASE_URL || 'localhost',
		ssl: {
			rejectUnauthorized: false
		}
	});
	await this.interfaces.db.init();
    return this;
  }
}

module.exports = App;
