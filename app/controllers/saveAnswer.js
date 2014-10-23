var express = require('express'),
  router = express.Router(),
  db = require('../models');

module.exports = function (app) {
  app.use('/', router);
};

var saveEachWord = function (word, obj) {

  db.DetailAnswers.find({
    where: {
      text: word,
      locale: obj.locale
    },
  }).success(function (data) {
    if (data) {
      // Quando encontra algo, atualiza o número
      data.updateAttributes({
        number: data.dataValues.number + 1
      });
    } else {
      // Quando não encontra nada, cria um novo
      db.DetailAnswers.create({
        text: word,
        locale: obj.locale,
        number: 1
      });
    }
  }).error(function (data) {
    console.log('error: ', data);
  })
}

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

    data.dataValues.text.split(' ').forEach(function (word) {
      saveEachWord(word, data.dataValues);
    });

    res.json({
      success: true,
      answer: data.dataValues.text
    });
  })
});
