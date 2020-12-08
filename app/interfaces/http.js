'use strict';
const express = require('express');
const parser = require('body-parser');
const http = require("http");
const mime = require('mime');
const path = require('path');
const fs = require("fs");

const Core = require('../core');

class Http {
  constructor(port){
    Core.log.info('Creating http server');
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
