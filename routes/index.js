var mongoose = require('mongoose');
var Countdown     = mongoose.model('Countdown');

exports.index = function(req, res){
  res.render('index', { 
    title: 'Countdown5'
  });
};