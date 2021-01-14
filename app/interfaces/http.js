'use strict';
const express = require('express');
const fileUpload = require('express-fileupload');
const parser = require('body-parser');
const userAgent = require('express-useragent');
const cookieParser = require('cookie-parser');
const http = require('http');
const mime = require('mime');
const path = require('path');
const fs = require('fs');

const Catalog = require('./routs/catalog.js');
const Genres = require('./routs/genres.js');
const IsLogin = require('./routs/islogin.js');
const Recommendations = require('./routs/recommendations.js');
const Register = require('./routs/register.js');
const GetFilmById = require('./routs/getFilmById.js');
const AddScore = require('./routs/addScore');
const Filter = require('./routs/filter.js');
const Random = require('./routs/random.js');
const GetFilm = require('./routs/getFilm.js');
const AdminPanel = require('./routs/adminPanel.js');
const ShowFilms = require('./routs/showFilms.js');
const RemoveFilm = require('./routs/removeFilm.js');
const AddFilm = require('./routs/addFilm.js');
const ShowComments = require('./routs/showComments.js');
const RemoveComment = require('./routs/removeComment.js');
const ApproveComment = require('./routs/approveComment.js');
const GetCommentsForFilm = require('./routs/getCommentsForFilm.js');
const GetUsername = require('./routs/getUsername.js');
const AddComment = require('./routs/addComment');

const Core = require('../core');
const { hash } = require('./crypto');

class Http {
  constructor(port, db) {
    this.agents = new Array();
    this.sessions = new Object();
    this.sessions_id = new Object();
    this.admin_perm = false;
    this.moder_perm = false;
    this.user_perm = false;
    this.db = db;
    Core.log.info('Creating http server');
    this.port = port;
    this.static_root = 'app/interfaces/html';
    this.app = express();
    this.app.use(cookieParser());
    this.app.use(userAgent.express());
    this.app.use(fileUpload({ createParentPath: true }));
    this.app.use(express.static(this.static_root));
    this.userid = undefined;
    this.app.use(parser.json());       // to support JSON-encoded bodies
    this.app.use(parser.urlencoded({     // to support URL-encoded bodies
      extended: false
    }));
    this.app.use((req, res, next) => {
	  req.db = this.db;
	  req.admin_perm = this.admin_perm;
	  req.moder_perm = this.moder_perm;
	  req.user_perm = this.user_perm;
	  req.sessions_id = this.sessions_id;
	  req.sessions = this.sessions;
	  req.userid = this.userid;
 	  next();
    });

    this.app.route('/catalog').post(Catalog);

    this.app.route('/genres').post(Genres);

    this.app.route('/login')
      .post(async (req, res) => {
        const salt = req.body.email;
        const hashed_pass = hash(req.body.password + salt);
        const query_users = this.db.sql();
        const query_admins = this.db.sql();
        const query_moders = this.db.sql();
        query_users.select(['hash', 'userid'])
          .inTable('users')
          .where({ login: `=${req.body.email}` });
        query_users.select(['hash'])
          .inTable('users')
          .where({ login: `=${req.body.email}` });
        query_admins.select(['hash'])
          .inTable('administrators')
          .where({ login: `=${req.body.email}` });
        query_moders.select(['hash'])
          .inTable('moderators')
          .where({ login: `=${req.body.email}` });

        const successAuth = () => {
          const session = Math.random().toString(16);
          res.cookie('session', session, { maxAge: 900000, httpOnly: true });
          this.sessions_id[hash(JSON.stringify(req.useragent))] = session;
          this.sessions[session] = req.body.email;
          res.status(200).end();
        };
        const userNotFound = () => {
          res.status(401).end();
        };
        const userInvalidPass = () => {
          res.status(401).end();
        };

        await query_users.exec(async (err, result) => {
          if (err) {
            Core.log.warning(err);
          }
          if (result[0] !== undefined) {
            if (result[0].hash === hashed_pass) {
              this.user_perm = true;
              this.userid = +result[0].userid;
              successAuth();
            } else {
              userInvalidPass();
            }
          } else {
            await query_moders.exec(async (err, result) => {
              if (err) {
                Core.log.warning(err);
              }
              if (result[0] !== undefined) {
                if (result[0].hash === hashed_pass) {
                  this.moder_perm = true;
                  successAuth();
                } else {
                  userInvalidPass();
                }
              } else {
                await query_admins.exec((err, result) => {
                  if (err) {
                    Core.log.warning(err);
                  }
                  if (result[0] !== undefined) {
                    if (result[0].hash === hashed_pass) {
                      this.moder_perm = true;
                      this.admin_perm = true;
                      successAuth();
                    } else {
                      userInvalidPass();
                    }
                  } else {
                    userNotFound();
                  }
                });
              }
            });
          }
        });
      });

    this.app.route('/islogin').post(IsLogin);

    this.app.route('/recomendations').post(Recommendations);

    this.app.route('/register').post(Register);

    this.app.route('/getFilmById').post(GetFilmById);

    this.app.route('/addScore').post(AddScore);

    this.app.route('/filter').post(Filter);

    this.app.route('/random').post(Random);

    this.app.route('/player')
      .get(async (req, res) => {
        res.sendFile(path.join(__dirname + '/html/player.html'));
      });

    this.app.route('/getFilm').post(GetFilm);

    this.app.route('/admin')
      .get(async (req, res) => {
        if (this.admin_perm) {
          res.sendFile(path.join(__dirname + '/html/admin.html'));
        } else {
          res.status(403).end();
        }
      });

    this.app.route('/adminPanel').post(AdminPanel);

    this.app.route('/moderation')
      .get(async (req, res) => {
        if (this.moder_perm) {
			    res.sendFile(path.join(__dirname + '/html/moderationPage.html'));
        } else {
			    res.status(403).end();
        }
      });

    this.app.route('/showFilms').post(ShowFilms);

    this.app.route('/removeFilm').post(RemoveFilm);

    this.app.route('/addFilm').post(AddFilm);

    this.app.route('/showComments').post(ShowComments);

    this.app.route('/removeComment').post(RemoveComment);

    this.app.route('/approveComment').post(ApproveComment);

    this.app.route('/getCommentsForFilm').post(GetCommentsForFilm);

    this.app.route('/getUsername').post(GetUsername);

    this.app.route('/addComment').post(AddComment);

    this.app.listen(this.port, () => {
      Core.log.info('Http server started');
    });
  }

  App() {
    return this.app;
  }
}


module.exports = Http;
