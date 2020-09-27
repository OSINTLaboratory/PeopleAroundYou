const fs = require('fs');
const Core = require('../core');

class Config {
  static create(confFile){
    if (!fs.existsSync(confFile)) {
      return null;
    }
    const file = fs.readFileSync(confFile);
    return JSON.parse(file);
  }
}

module.exports = Config;
