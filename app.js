'use strict';

const Core = require('./app/core');
const Http = require('./app/interfaces/http');
const Interfaces = require('./app/interfaces');

// Класс обьеденяющий работу всех интерфейсов в приложение
class App {
  constructor() {
    this.interfaces = new Interfaces();
  }

  // старт приложения
  start() {
    this.interfaces.up(new Http(process.env.PORT || 80));
    return this;
  }
}

module.exports = App;
