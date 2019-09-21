'use strict'

const PROD = (process.env.NODE_ENV === 'production')
console.log(PROD)

let gpio, gpiop
if (!PROD) {
    console.log('Stubbed')
    gpio = { DIR_OUT: 1 }
    gpiop = {
        setup: async () => { console.log('Stubbed setup') },
        write: async (pin, status) => { console.log(`Stubbed write (${pin}, ${status})`) }
    }
} else {
    console.log('Running prod')
    gpio = require('rpi-gpio')
    gpiop = gpio.promise
}

const sleep = require('util').promisify(setTimeout)

const setupPins = []
module.exports = {
    setup: async (pins) => {
        for (let pin of pins) {
            await gpiop.setup(pin, gpio.DIR_OUT)
            setupPins.push(pin)
        }
    },
    run: async (pin) => {
        await gpiop.write(pin, true)
        await sleep(500)
        await gpiop.write(pin, false)
    },
    cleanup: async () => {
        for (let pin of setupPins) {
            await gpiop.write(pin, false)
            console.log(`Set ${pin} to false`)
        }
    }
}
