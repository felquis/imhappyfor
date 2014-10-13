var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'imhappyfor'
    },
    port: 3000,
    db: {
      host: 'localhost',
      port: '3306',
      dbname: 'imhappyforcom',
      user: 'root',
      password: 'root'
    }

  },

  test: {
    root: rootPath,
    app: {
      name: 'imhappyfor'
    },
    port: 3000,
    db: 'mysql://localhost/imhappyforcom-test'

  },

  production: {
    root: rootPath,
    app: {
      name: ''
    },
    port: 3000,
    db: process.env.MYSQL_ENV || 'mysql://localhost/imhappyforcom-prod'
  }
};

module.exports = config[env];
