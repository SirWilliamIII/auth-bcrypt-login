const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const _ = require('lodash')
const { User } = require('./models/user')
const { mongoose } = require('./db/mongoose')

const app = express()
const port = process.env.PORT || 3000


app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/users', (req, res) => {

	const body = _.pick(req.body, ['email', 'password'])
	const user = new User(body)

	user.save()
		.then(user => {
			console.log(user)
			return user.generateAuthToken()
		})
		.then(token => {
			res.header('x-auth', token).send(user)
		})
		.catch(e => {
			res.status(404).send(e)
		})
})

app.get('/', (req, res) => {
	User.find()
		.then(user => {
			res.send(user)
		})
})

app.get('/me', (req, res) => {
	User.findByToken('')
		.then(user => {
			res.send(user)
		})
})

app.get('users/me', (req, res) => {
	const token = req.header('x-auth')

	User.findByToken(token)
		.then(user => {
			if(!user) {
				return Promise.reject()
			}
			res.send(user)
		})
		.catch(e => {
			res.status(401).send()
		})
})

app.listen(port, () => {
	console.log(`Listening on port ${port}`)
})


