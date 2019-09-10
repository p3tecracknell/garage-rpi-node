'use strict'

const os = require('os')
const isWindows = os.release().endsWith('Microsoft')

let gpio, gpiop
if (isWindows) {
    gpio = { DIR_OUT: 1 }
    gpiop = {
        setup: async () => { console.log('Stubbed setup') },
        write: async () => { console.log('Stubbed write') }
    }
} else {
    gpio = require('rpi-gpio')
    gpiop = gpio.promise
}

const sleep = require('util').promisify(setTimeout)

module.exports = {
    setup: async (pins) => {
        console.log(pins)
        for (let pin of pins) {
            await gpiop.setup(pin, gpio.DIR_OUT)
        }
    },
    run: async (pin) => {
        await gpiop.write(pin, true)
        await sleep(500)
        await gpiop.write(pin, false)
    }
}