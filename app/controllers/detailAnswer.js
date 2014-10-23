var express = require('express'),
  router = express.Router(),
  db = require('../models');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/list', function (req, res, next) {

  db.DetailAnswers.findAll({
    attributes: ['text', 'number', 'id']
  }).success(function(data) {
    res.json({
      success: true,
      data: data
    });
  })
});
