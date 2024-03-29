'use strict'

const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))

const gpio = require('./gpio')

const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'web')))

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

async function exitHandler(options, exitCode) {
    await gpio.cleanup()
    if (options.cleanup) console.log('clean');
    if (exitCode || exitCode === 0) console.log(exitCode);
    if (options.exit) process.exit();
}

//do something when app is closing
process.on('exit', exitHandler.bind(null,{cleanup:true}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit:true}));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, {exit:true}));
process.on('SIGUSR2', exitHandler.bind(null, {exit:true}));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));
