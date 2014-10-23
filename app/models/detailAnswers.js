// Example model


module.exports = function (sequelize, DataTypes) {

  var DetailAnswers = sequelize.define('DetailAnswers', {
    text: DataTypes.STRING(140),
    locale: DataTypes.STRING,
    number: DataTypes.INTEGER
  });

  return DetailAnswers;
};
