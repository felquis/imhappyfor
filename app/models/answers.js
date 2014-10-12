// Example model


module.exports = function (sequelize, DataTypes) {

  var Answers = sequelize.define('Answers', {
    text: DataTypes.STRING(140),
    bg: DataTypes.STRING(140),
    locale: DataTypes.STRING
  });

  return Answers;
};
