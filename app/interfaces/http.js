'use strict';
const express = require('express');
const parser = require('body-parser');
const cookieParser = require('cookie-parser');
const http = require("http");
const mime = require('mime');
const path = require('path');
const fs = require("fs");

const Core = require('../core');
const { hash } = require('./crypto');

class Http {
  constructor(port, db){
	class Session {
		constructor(login, session){
			this.login = login;
			this.session = session;
		}
	};
	this.sessions = new Array;
	this.db = db;
    Core.log.info('Creating http server');
    this.port = port;
    this.static_root = "app/interfaces/html";
    this.app = express();
	this.app.use(cookieParser());
    this.app.use(express.static(this.static_root));
    this.app.use(parser.json());       // to support JSON-encoded bodies
    this.app.use(parser.urlencoded({     // to support URL-encoded bodies
      extended: false
    }));
    this.app.use((err, req, res, next) => {
      res.status(err.status || 500);
      res.json({
        message: err.message,
        error: err
      });
    });
	
	this.app.route('/catalog')
		.post((req, res) => {
			console.log("catalog: ", req.body);
			res.end();
		});
	this.app.route('/search')
		.post((req, res) => {
			console.log("search: ", req.body);
		});
		
	this.app.route('/login')
		.post(async (req, res) => {
			const salt = req.body.email;
			const hashed_pass = hash(req.body.password + salt);
			const query = this.db.sql();
			query.select()
				.inTable('users')
				.value("hash")
				.where({ login: `=${req.body.email}` });
			await query.exec((err, result) => {
				console.log(result, hashed_pass);
				if(result === hashed_pass) {
					const randomNumber = Math.random().toString(16);
					res.cookie('session', randomNumber, { maxAge: 900000, httpOnly: true });
					this.sessions.push(new Session(req.body.email, randomNumber));
					res.status(200).end();
				} else {
					res.status(403).end();
				}
			});
		});
		
	this.app.route('/register')
		.post(async (req, res) => {
			const salt = req.body.email;
			const query = this.db.sql();
			query.insert()
				.inTable('users')
				.values({
					login: req.body.email,
					hash: hash(req.body.password + salt)
				});
			await query.exec((err, result) => {
				if (err) {
					Core.log.warning(err);
					res.status(500).end();
					return;
				}
				res.status(200).end();
			});
		});
		
	this.app.route('/top')
		.post((req, res) => {
			console.log("top: ", req.body);
		});
	this.app.route('/random')
		.post((req, res) => {
			console.log("random: ", req.body);
		});
	  
    this.app.listen(this.port, () => {
      Core.log.info('Http server started');
    });
  }

  App()
  {
    return this.app;
  }
};

module.exports = Http;
