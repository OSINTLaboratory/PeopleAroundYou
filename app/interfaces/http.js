'use strict';
const express = require('express');
const parser = require('body-parser');
const userAgent = require('express-useragent');
const cookieParser = require('cookie-parser');
const http = require("http");
const mime = require('mime');
const path = require('path');
const fs = require("fs");

const Core = require('../core');
const { hash } = require('./crypto');

class Http {
  constructor(port, db){
	this.agents = new Array;
	this.sessions = new Object;
	this.sessions_id = new Object;
	this.db = db;
    Core.log.info('Creating http server');
    this.port = port;
    this.static_root = "app/interfaces/html";
    this.app = express();
	this.app.use(cookieParser());
	this.app.use(userAgent.express());
    this.app.use(express.static(this.static_root));
    this.app.use(parser.json());       // to support JSON-encoded bodies
    this.app.use(parser.urlencoded({     // to support URL-encoded bodies
      extended: false
    }));
	
	this.app.route('/catalog')
		.post((req, res) => {
			console.log("catalog: ", req.body);
			res.end();
		});
	this.app.route('/search')
		.post((req, res) => {
			console.log("search: ", req.body);
			res.end();
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
				if(result === hashed_pass) {
					const session = Math.random().toString(16);
					res.cookie('session', session, { maxAge: 900000, httpOnly: true });
					this.sessions_id[hash(JSON.stringify(req.useragent))] = session;
					this.sessions[session] = req.body.email;
					res.status(200).end();
				} else {
					res.status(401).end();
				}
			});
		});
		
	this.app.route('/islogin')
		.post(async (req, res) => {
			if(req.cookies === undefined){
				res.send("false").end(200);
				return;
			}
			
			if(req.cookies['session'] === undefined){
				res.send("false").end(200);
				return;
			}
			
			if(this.sessions_id[hash(JSON.stringify(req.useragent))] === undefined){
				res.send("false").end(200);
				return;
			}
			
			if(this.sessions_id[hash(JSON.stringify(req.useragent))] != req.cookies['session']){
				res.send("false").end(200);
				return;
			}
			
			res.send("true").end(200);
		});
		
	this.app.route('/recomendations')
		.post(async (req, res) => {
			if(req.cookies === undefined){
				res.end(200);
				return;
			}
			if(req.cookies['session'] === undefined){
				res.end(200);
				return;
			}
			
			if(!sessions_d.includes(req.cookies['session'])){
				res.end(200);
				return;
			}
			
			const login = sessions[req.cookies['session']];
			const query = this.db.sql();
			query.select()
				.inTable('users')
				.value("viewed")
				.where({ login: `=${login}` });
			await query.exec((err, result) => {
				if (err) {
					Core.log.warning(err);
					res.status(500).end();
					return;
				}
				res.status(200).end();
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
