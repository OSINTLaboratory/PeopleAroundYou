'use strict';

class Task {
  constructor(lable, method, url, callback, data = null) {
    this.lable = lable;
    this.method = method;
    this.url = url;
    this.data = data;
    this.callback = callback;
  }
}

module.exports = Task;
