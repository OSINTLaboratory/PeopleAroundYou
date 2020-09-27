'use strict';

// Класс обьеденяющий работу всех интерфейсов в единое целое
// и отвечающий за функциональность всех интерфейсов
class Interfaces {
  constructor() {
    this.interfaces = new Array();
  }
  up(i) {
    this.interfaces.push(i);
  }
}

module.exports = Interfaces;
