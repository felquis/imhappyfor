var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

console.log(process.env.NODE_ENV);

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'imhappyfor'
    },
    port: 3000,
    db: {
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      dbname: process.env.MYSQL_DBNAME,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD
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
    db: {
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      dbname: process.env.MYSQL_DBNAME,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD
    }
  }
};

module.exports = config[env];
