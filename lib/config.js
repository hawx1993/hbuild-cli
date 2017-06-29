/**
 * Created by hwx34 on 2017/6/28.
 */
const home = require('user-home');

const { join , exists } = require('./util')

const configPath = join(home, '.hbuild')
const repoPath = join(configPath, 'repos')
const pkgPath = join(configPath, 'packages')

function getConfig(dest, configFile) {
    return new Promise((resolve, reject) => {
      const configPath = join(dest, configFile)
      exists(configPath, exists => {
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
exports.configPath = configPath
exports.repoPath = repoPath
exports.pkgPath = pkgPath
exports.getConfig = getConfig