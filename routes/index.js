
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', {
  	imhappyfor: 'I\'m Happy For...',
  	title: 'I\'m Happy For... my family, my work, home'
  });
};


/*
 * GET test page.
 */

exports.test = function(req, res){
  res.render('test', {
  	imhappyfor: 'I\'m Happy For...',
  	title: 'I\'m Happy For... my family, my work, home'
  });
};