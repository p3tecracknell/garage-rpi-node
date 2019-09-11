'use strict'

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const gpio = require('./gpio')

const PORT = process.env.PORT || 3000

app.use(express.static('web'))
app.use(bodyParser.urlencoded())

app.post('/action', async (req, res) => {
    const pin = req.body.pin
    await gpio.run(pin)
    res.redirect('/')
})

gpio.setup([7, 8])
    .then(async () => {
        app.listen(PORT, () => console.log(`Listening on port ${PORT}!`))

    })
    .catch((err) => {
        console.log('Error: ', err.toString())
    })
