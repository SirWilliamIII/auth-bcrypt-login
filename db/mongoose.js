const mongoose = require('mongoose')

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/tokens', err => {
	if(err) {
		console.log(err)
	} else {
		console.log('We are connected to the database!')
	}
})

module.exports = { mongoose }
