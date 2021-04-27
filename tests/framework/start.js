'use strict';

const Core = require('../../app/core');
const Tester = require('./tester');
const fs = require('fs');

process
  .on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p);
  })
  .on('uncaughtException', err => {
    Core.log.error(err);
  });

const doTests = () => {
  const tester = new Tester('localhost', 8000);

  fs.readdir('tests', (err, files) => {
	  if (files === undefined) {
    		  Core.log.warning('Tests not specified');
		  return;
	  }
    files.forEach(file => {
	   if (file !== 'framework') {
        	const tasks = require(__dirname + '/../' + file);
	        tester.run(tasks, file.split('.')[0]);
	   }
    });
  });
};

setTimeout(doTests, 1000);

