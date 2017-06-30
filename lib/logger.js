const { format } = require('util')
const {cyan , red  ,green, gray} = require('./colors')


function log(...msg) {
    console.log(...msg)
}
const prefix = 'hbuild-cli'
const dot = gray('.')

/**
 * Log a `message` to the console.
 */
exports.log = function () {
  const msg = format.apply(format, arguments)
  log(cyan(prefix), dot, msg)
}

/**
 * Log an fatal `message` to the console and exit.
 *
 * @param {String} message
 */
exports.fatal = function (message) {
  exports.error(red(message))

  if (process.env.NODE_ENV === 'testing') {
    throw new Error('exit')
  } else {
    process.exit(1)
  }
}

/**
 * Log a success `message` to the console and exit.
 *
 */
exports.success = function (msg) {
  log(green('SUCCESS'), msg)
}
