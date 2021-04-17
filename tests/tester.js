'use strict';

class Task {
	method: '',
	url: '',
	data: '',
	status: 200
}

class Tester {
  constructor(tasks) {
	  if(!tasks instanceof Array) {
		  throw new Error('Tester require an array of tasks');
	  }
	  if(!tasks.length) {
		  throw new Error('Tasks must be specified');
	  }
	  if(!tasks[0] instanceof Task) {
		  throw new Error('Tasks must be instance of Task class');
	  }
	  
	  this.tasks = tasks;
  }
  
  
  
  run() {
	  try {
		  
	  } catch(err) {
		  console.error(err);
	  }
  }
};
