'use strict';

const Task = require('./framework/task');
const { assert } = require('./framework/helper');

const expectedCommentInfo1 = {
  commentid: 1,
  filmid: 4,
  userid: 2,
  textdata: 'Film so bad don`t rec',
  approved: false
};
const expectedCommentText = 'Noice';
const expectedFilmTitle = 'Bitcoin';
const expectedFilmsCount = 28;

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

  new Task(
    'Test show comments first comment:',
    'post', '/showComments',
   (res, data) => assert(JSON.stringify(JSON.parse(data)[0]), JSON.stringify(expectedCommentInfo1))
  ),

  new Task(
    'Test show comments first comment:',
    'post', '/showComments',
    (res, data) => assert(JSON.parse(data)[1].textdata, expectedCommentText)
  ),

  new Task(
    'Test first film:',
    'post', '/showFilms',
    (res, data) => assert(JSON.parse(data)[0].title, expectedFilmTitle)
  ),

  new Task(
    'Test film quantity:',
    'post', '/showFilms',
    (res, data) => assert(JSON.parse(data).length, expectedFilmsCount)
  ),
];

