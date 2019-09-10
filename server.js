'use strict'

const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const gpio = require('./gpio')

app.post('/', async (req, res) => {
    await gpio.run()
    res.send('ok')
})

gpio.setup([7])
    .then(async () => {
        app.listen(PORT, () => console.log(`Listening on port ${PORT}!`))

    })
    .catch((err) => {
        console.log('Error: ', err.toString())
    })