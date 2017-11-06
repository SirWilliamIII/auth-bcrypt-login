var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://will:will@ds249605.mlab.com:49605/tokens');

var db = mongoose.connection;

db.once('open', function () {
	console.log('Connected!!')
});

module.exports = { mongoose };
