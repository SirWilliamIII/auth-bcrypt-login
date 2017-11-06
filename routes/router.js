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

	User.findByCredentials(body.email, body.password)
		.then(user => {
			return user.generateAuthToken()
				.then(token => {
					res.header('x-auth', token).send(user)
				})
		}).catch(e => {
			res.status(400).send(e)
	})
})

router.delete('/users/me/token', authenticate, (req, res) => {
	req.user.removeToken(req.token)
		.then(() => {
			res.status(200).send()
		}, () => {
			res.status(400).send()
		})

})


module.exports = router
