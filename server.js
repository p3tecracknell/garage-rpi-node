'use strict'

const express = require('express')
const app = express()
const gpio = require('rpi-gpio')
const PORT = process.env.PORT || 3000
const sleep = require('util').promisify(setTimeout)
const gpiop = gpio.promise

app.post('/', async (req, res) => {
    await gpiop.write(7, true)
    await sleep(500)
    await gpiop.write(7, false)
    res.send('Hello World!')
})

console.log('Setting up GPIO Pin 7')
gpiop.setup(7, gpio.DIR_OUT)
    .then(async () => {
        app.listen(PORT, () => console.log(`Listening on port ${PORT}!`))

    })
    .catch((err) => {
        console.log('Error: ', err.toString())
    })