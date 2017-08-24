const mongoose = require('mongoose')

//  For using ES6 Promise implementation??
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://kela:kela@ds149743.mlab.com:49743/token', err => {
	if(err) {
		console.log(err)
	} else {
		console.log('We are connected to the database!')
	}
})

module.exports = { mongoose }
