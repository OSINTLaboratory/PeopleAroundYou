'use strict';

const Task = require('./framework/task');
const { assert } = require('./framework/helper');

module.exports = [
  new Task(
    'Test to open moderation page without permissions',
    'post', '/moderation',
    res => assert(res.statusCode, 404)
  ),

  new Task(
    'Test to remove film without permissions',
    'post', '/removeFilm',
    res => assert(res.statusCode, 403)
  ),

  // new Task(
  //     'Test to add film without permissions',
  //     'post', '/addFilm',
  //     res => assert(res.statusCode, 403)
  // ),

  new Task(
    'Test to remove comment without permissions',
    'post', '/removeComment',
    res => assert(res.statusCode, 403)
  ),

  new Task(
    'Test to approve comment without permissions',
    'post', '/approveComment',
    res => assert(res.statusCode, 403)
  ),

  new Task(
    'Test to show all films without permissions',
    'post', '/showFilms',
    res => assert(res.statusCode, 200)
  ),

  new Task(
    'Test to show all comments without permissions',
    'post', '/showComments',
    res => assert(res.statusCode, 200)
  ),

];

