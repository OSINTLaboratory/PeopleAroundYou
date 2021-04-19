'use strict';
const Core = require('../../app/core');

const assert = (lhs, rhs) => {
  if(lhs !== rhs) {
    throw new Error(`Assert failed: ${lhs} !== ${rhs}`);
  }
}

module.exports = { assert };

