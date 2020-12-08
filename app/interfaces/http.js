'use strict';
const express = require('express');
const parser = require('body-parser');
const http = require("http");
const mime = require('mime');
const path = require('path');
const fs = require("fs");

const Core = require('../core');
const db = require('./db');

class Http {
  constructor(port){
    Core.log.info('Http server creating');
    this.port = port;
    this.static_root = "app/interfaces/html";
    this.app = express();

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
		.post(function(req, res) {
			console.log("catalog: ", req.body);
		});
	this.app.route('/search')
		.post(function(req, res) {
			console.log("search: ", req.body);
		});
		
	this.app.route('/login')
		.post(function(req, res) {
			console.log("login: ", req.body);
		});
	this.app.route('/register')
		.post(function(req, res) {
			console.log("register: ", req.body);
		});
	this.app.route('/top')
		.post(function(req, res) {
			console.log("top: ", req.body);
		});
	this.app.route('/random')
		.post(function(req, res) {
			console.log("random: ", req.body);
		});
	  
    this.app.listen(this.port, ()=>{
      Core.log.info('Http server started');
    });
  }

  App()
  {
    return this.app;
  }
};

module.exports = Http;
