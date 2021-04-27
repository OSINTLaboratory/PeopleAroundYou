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
    const username = process.env.USER;
    if (process.env.DATABASE_URL) {
      this.interfaces.db = new Database({
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false
        }
      });
    } else {
      this.interfaces.db = new Database({
	      connectionString: `postgresql://${username}:${username}@localhost:5432/application`,
        ssl: false
      });
    }
    this.interfaces.db.isReady.then(() => {
      this.interfaces.http = new Http(process.env.PORT || 8000, this.interfaces.db);
    });

    return this;
  }
  stop() {
    this.interfaces.http.close();
    this.interfaces.db.Pool().end();
  }
}

module.exports = App;
