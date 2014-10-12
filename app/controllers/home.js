var express = require('express'),
  router = express.Router(),
  db = require('../models');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  db.Answers.count().success(function(count) {
    res.render('index', {
      answersNumber: count
    });
  })
});
