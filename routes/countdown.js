var mongoose  = require('mongoose');
var Countdown = mongoose.model('Countdown');
var crypto    = require('crypto');

exports.create = function (req, res) {
  console.log(req.body);

  var customCss = "";
  Object.keys(req.body.custom_css).forEach(function (element, index, _array) {
    customCss += "."+element+"-container { "+req.body.custom_css[element]+" }\n";
  });

  new Countdown({
    title       : req.body.title,
    until       : req.body.until,
    description : req.body.description,
    background_image : req.body.background_image,
    slug        : crypto.createHash('md5').update(req.body.title+Date.now()).digest("hex"),
    custom_css  : customCss
  }).save( function (err, countdown, count) {
    res.redirect('/show/'+countdown.slug);
  });
};

exports.show = function (req, res) {
  Countdown.findOne({'slug': req.params.id}, 'until title description custom_css background_image', function (err, countdown) {
    res.render('show', { 
      title: 'Express',
      countdown: countdown
    });
  });
};