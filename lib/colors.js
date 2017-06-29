/**
 * Created by hwx34 on 2017/6/27.
 */
const colors = require('chalk')

exports.cyan = (...msg) => {
  return colors.cyan(...msg)
}

exports.red = (...msg) => {
  return colors.red(...msg)
}

exports.green = (...msg) => {
  return colors.green(...msg)
}
exports.gray  = (...msg) => {
  return colors.gray(...msg)
}

exports.yellow = (...msg) => {
  return colors.yellow(...msg)
}
