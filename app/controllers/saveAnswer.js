var express = require('express'),
  router = express.Router(),
  db = require('../models');

module.exports = function (app) {
  app.use('/', router);
};

router.post('/save', function (req, res, next) {

  if (req.body.text.length < 3) {
    res.send(400).json({
      success: false,
      text: 'missing text'
    });

    return false;
  }

  db.Answers.create({
    text: req.body.text,
    bg: req.body.bg,
    locale: req.locale
  }).success(function(data, b, c) {

    console.log(data.dataValues);

    res.json({
      success: true,
      answer: data.dataValues.text
    });
  })
});
