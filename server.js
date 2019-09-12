'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))

const gpio = require('./gpio')

const PORT = process.env.PORT || 3000

app.post('/action', async (req, res) => {
    const pin = req.body.pin
    await gpio.run(pin)
    res.redirect('/')
})

app.post('/fulfillment', app)

gpio.setup([7, 8])
    .then(async () => {
      app.listen(PORT, () => console.log(`Listening on port ${PORT}!`))
    })
    .catch((err) => {
        console.log('Error: ', err.toString())
    })
