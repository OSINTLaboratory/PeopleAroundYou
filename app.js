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
    this.interfaces.db = new Database({
      connectionString: process.env.DATABASE_URL || 'postgresql://postgres:admin@localhost:5432/postgres',
      ssl: !!process.env.DATABASE_URL
    });
    if (process.env.DATABASE_URL) {
      this.interfaces.db = new Database({
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false
        }
      });
    } else {
      this.interfaces.db = new Database({
        connectionString: 'postgresql://postgres:admin@localhost:5432/postgres',
        ssl: false
      });
    }
    this.interfaces.db.isReady.then(() => {
      this.interfaces.http = new Http(process.env.PORT || 80, this.interfaces.db);
    });

    return this;
  }
}

module.exports = App;
