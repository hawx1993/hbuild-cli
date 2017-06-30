/**
 * Created by trigkit4 on 2017/6/28.
 */
const home = require('user-home');
const fs = require('fs')
const { join  } = require('./util')

const configPath = join(home, '.hbuild')
const repoPath = join(configPath, 'repos')
const pkgPath = join(__dirname, '../../')

/**
 * get config file data (meta.js) content.
 *
 * @param {String} dest
 * @param {String} configFile
 */
function getConfig(dest, configFile) {
    return new Promise((resolve, reject) => {
      const configPath = join(dest, configFile)
      fs.exists(configPath, exists => {
        if(!exists) return resolve(null)
        try{
          resolve(require(configPath))
        } catch (err) {
          if(err.code === 'MODULE_NOT_FOUND'){
            resolve(require(configPath))
          }else{
            reject(err)
          }
        }
      })
    })
}
module.exports = {
    configPath: configPath,
    repoPath: repoPath,
    pkgPath: pkgPath,
    getConfig: getConfig
}