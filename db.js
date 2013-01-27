var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;
 
var Countdown = new Schema({
    description      : String,
    title            : String,
    until            : Date,
    slug             : String,
    custom_css       : String,
    background_image : String
});
 
mongoose.model('Countdown', Countdown);
 
mongoose.connect('mongodb://localhost/countdown5');