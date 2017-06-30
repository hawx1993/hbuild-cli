/**
 * Created by trigkit4 on 2017/6/21.
 */

const path = require('path');
const fs = require('fs');

exports.isRepo = function (input) {
  return input.indexOf('/') > -1
}

exports.resolve = function (...pathname) {
  return path.resolve(process.cwd(),...pathname)
}
exports.join = function (...pathname) {
  return path.join(...pathname)
}

exports.base = function (...pathname) {
    return path.basename(...pathname)
}
//检查输入值是否是本地路径
exports.isLocalPath = function (input) {
  return /^[./]|(^[a-zA-Z]:)/.test(input)
}


exports.exists = function (path) {
  if(fs.existsSync(path)){
    return path
  }
  return undefined
}
const pathExists = fp => new Promise(resolve => {
    fs.access(fp ,err => {
        resolve( !err )
    })
})

exports.pathExists = pathExists