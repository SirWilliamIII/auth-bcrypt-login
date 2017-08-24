const mongoose = require('mongoose')

const Todo = mongoose.model('Todo', {
	text: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	rating: {
		type: Number,
		minlength: 1,
		default: 1
	},
	completed: {
		type: Boolean,
		default: false
	},
	completedAt: {
		type: Number,
		default: null
	}
})

module.exports = { Todo }
