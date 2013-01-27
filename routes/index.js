var mongoose = require('mongoose');
var Countdown     = mongoose.model('Countdown');

exports.index = function(req, res){
  Countdown.find(function (err, todos, count) {
    res.render('index', { 
      title: 'Express',
      countdownCount: count
    });
  })
};