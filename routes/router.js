const express = require('express')
const router = express.Router()
const _ = require('lodash')
const { User } = require('../models/user')
const { authenticate } = require('../middleware/authenticate')


router.post('/users', (req, res) => {

	const body = _.pick(req.body, ['email', 'password'])
	const user = new User(body)

	user.save()
		.then(() => {
			return user.generateAuthToken()
		})
		.then(token => {
			res.header('x-auth', token).send(user)
		})
		.catch(e => {
			res.status(404).send(e)
		})
})

router.get('/users/me', authenticate, (req, res) => {
	res.send(req.user)
})


router.post('/users/login', (req, res) => {
	const body = _.pick(req.body, ['email', 'password'])

	res.send(body)
})



module.exports = router
