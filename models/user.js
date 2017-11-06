const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const UserSchema = new Schema({
	email:    {
		type:      String,
		required:  true,
		trim:      true,
		unique:    true,
		minlength: 1,
		validate:  {
			validator: validator.isEmail,
			message:   'Email is not valid'
		}
	},
	password: {
		type:      String,
		required:  true,
		minlength: 6
	},
	tokens:   [{
		access: {
			type:     String,
			required: true
		},
		token:  {
			type:     String,
			required: true
		}
	}]
})

UserSchema.methods.toJSON = function () {
	const user = this
	const userObj = user.toObject()

	return _.pick(userObj, ['_id', 'email'])
}

UserSchema.methods.generateAuthToken = function () {
	const user = this
	const access = 'auth'
	const token = jwt.sign({
		_id: user._id.toHexString(),
		access
	}, 'secret_sauce').toString()

	user.tokens.push({
		access,
		token
	})

	return user.save()
		.then(() => {
			return token
		})
}

UserSchema.statics.findByToken = function (token) {
	var User = this
	let decoded;

	try {
		decoded = jwt.verify(token, 'secret_sauce')
	} catch(e) {
		return Promise.reject()
	}
	return User.findOne({
		'_id':           decoded._id,
		'tokens.token':  token,
		'tokens.access': 'auth'
	})
}

UserSchema.pre('save', function (next) {
	const user = this
	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(user.password, salt, (err, hash) => {
			user.password = hash
			next()
		})
	})
})

const User = mongoose.model('User', UserSchema)

module.exports = { User }
