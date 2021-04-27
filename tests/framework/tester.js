'use strict';
const http = require('http');
const Task = require('./task');
const Core = require('../../app/core')
const getRequest = task => {
  const req = new Object();

  req.method = task.method;
  req.path = task.url;
  req.data = task.data;

  if (task.data) {
    req.headers = {
      'Content-Type': 'application/json',
      'Content-Length': task.data.length,
    };
  }
  return req;
};

class Tester {
  constructor(host, port) {
    this.host = host;
    this.port = port;
  }

  run(tasks, modulename) {
    if(!(tasks instanceof Array)) {
      Core.log.error('Tasks module must export instance of Array of Task class');
      return;
    }

    tasks.forEach( task => {
      if (!(task instanceof Task)) {
        Core.log.warning('Task module must export instance of Task class');
	return;
      }
        
      try {
        const request = getRequest(task);
      request.port = this.port;
      request.host = this.host;

      const req = http.request(request);

      req.on('response', res => {
          let data = '';

	  res.on('data', (chunk) => {
	    data += chunk;
	  });

	  res.on('close', () => {
            try {
	      task.callback(res, data);
	      Core.log.info(`Test module ${modulename}: ${task.lable}`);
	    } catch(err) {
	      Core.log.warning(`Test module ${modulename}: ${task.lable}\n\t\t${err}`);
	    }
	  });
      });

      req.on('error', err => {
        Core.log.warning(`Test module ${modulename}: ${task.lable}\n\t\t${err}`);
      });

      if (task.data) {
	      req.write(task.data);
      }

      req.end();

	  } catch (err) {
        	Core.log.warning(`Test module ${modulename}: ${task.lable}\n\t\t${err}`);
	  }
  });
  }
}

module.exports = Tester;

