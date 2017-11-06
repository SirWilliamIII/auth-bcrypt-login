const express = require('express'),
      bodyParser = require('body-parser'),
      logger = require('morgan'),
      _ = require('lodash')

const { mongoose } = require('./db/mongoose')
const router = require('./routes/router')

const app = express()
const port = process.env.PORT

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(router)

app.listen(port, () => {
	console.log(`Listening on port ${port}`)
})


