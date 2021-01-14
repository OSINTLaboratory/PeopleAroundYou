'use strict';
const { hash } = require('./app/interfaces/crypto');

const login = 'user0';
const password = '12345';
const salt = login;
console.log(login);
console.log(hash(password + salt));
