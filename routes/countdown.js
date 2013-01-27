var mongoose  = require('mongoose');
var Countdown = mongoose.model('Countdown');
var crypto    = require('crypto');

exports.create = function (req, res) {
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
    //res.redirect('/show/'+countdown.slug);
    res.contentType('json');
    res.send(JSON.stringify({
      countdown: {
        slug: countdown.slug
      }
    }));
  });
};

exports.update = function (req, res) {
  var customCss = "";
  Object.keys(req.body.custom_css).forEach(function (element, index, _array) {
    customCss += "."+element+"-container { "+req.body.custom_css[element]+" }\n";
  });

  Countdown.findOne({'slug': req.params.id}, 'until title description custom_css background_image', function (err, countdown) {
    countdown.title = req.body.title;
    countdown.until = req.body.until;
    countdown.description = req.body.description;
    countdown.background_image = req.body.background_image;
    countdown.custom_css = customCss;
    countdown.save( function (err, countdown, count) {
      res.contentType('json');
      res.send(JSON.stringify({
        countdown: {
          slug: countdown.slug
        }
      }));
    });
  });
}

exports.show = function (req, res) {
  Countdown.findOne({'slug': req.params.id}, 'until title description custom_css background_image', function (err, countdown) {
    res.render('show', { 
      title: 'Express',
      countdown: countdown
    });
  });
};