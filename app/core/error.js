'use strict';

const CODES = {
  0x000001: {
    msg: 'unknown error: all fuck up'
  },
  0x000002: {
    msg: 'config file not found'
  },
};

const errorCodeToStr = code => code.toString();

class CustomError {
  constructor(code) {
    const err = {};
    err.stack = (new Error()).stack;
    if (CODES[code]) {
      err.code = code;
      err.msg = CODES[code].msg;
    } else {
      err.msg = code;
    }
    return err;
  }
  static toString(err) {
    let text = '';
    if (err.code) {
      text += `(${errorCodeToStr(err.code)}) `;
    }
    if (err.msg) {
      text += `${err.msg} `;
    }
    if (err.message && !err.stack) {
      text += `${err.message} `;
    }
    if (err.dest) {
      text += `${err.dest} `;
    }
    if (err.stack) {
      text += `${err.stack} `;
    }
    return text;
  }
}

module.exports = CustomError;
