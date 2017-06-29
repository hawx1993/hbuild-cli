const { format } = require('util')
const {cyan , red , yellow ,green, gray} = require('./colors')


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
 * Log an error `message` to the console and exit.
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
 * Log an error `message` to the console and no exit.
 *
 */
exports.error = function (message) {
  const msg = format.apply(format, arguments)
  console.error(red(prefix), dot, msg)
}

exports.warn = function () {
  const msg = format.apply(format, arguments)
  log(yellow(prefix), dot, msg)
}

/**
 * Log a success `message` to the console and exit.
 *
 */
exports.success = function () {
  const msg = format.apply(format, arguments)
  log(green(prefix), dot, msg)
}
