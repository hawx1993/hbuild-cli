/**
 * Created by trigkit4 on 2017/6/28.
 */
'use strict'
const ora = require('ora')
const co = require('co')
const { isLocalPath, resolve, join, pathExists} = require('./util')
const download = require('./download')
const { repoPath } = require('./config')
const event = require('./event')
const generate = require('./generate')
const inq = require('inquirer')
const semver = require('semver')

module.exports = co.wrap(function * ({
  localTemplate,
  targetFolder = './',
  config: configFile = 'meta.js'
} = {}) {
  let dest;
  let callbackGen = function () {
    return generate({
      dest: dest,
      configFile,
      targetFolder
    })
  }
  if(isLocalPath( localTemplate )){
      dest = resolve(localTemplate)
      callbackGen()
  }else {
      const spinner = ora('checking versions...')
      dest = join(repoPath, 'hbuild')
      const exists = yield pathExists(dest)
      if(!exists){
          //emit download msg
          event.emit('start-download')
          yield download.repo('hbuild')
          event.emit('stop-download')
          callbackGen()
      }else{
          //check package version
          const localPackageVersion  = require(join(dest,'package.json')).version
          spinner.start()
          require('./get-version')(function (latestVersion) {
              if(latestVersion){
                  spinner.stop()
                  if(semver.lt(localPackageVersion,latestVersion)){
                      co(function * () {
                          const { install } = yield inq.prompt([{
                              name: 'install',
                              message: ' A newer version of hbuild is available. download it?',
                              type: 'confirm',
                              default: true
                          }])
                          if(install){
                            event.emit('start-download')
                            yield download.repo('hbuild')
                            event.emit('stop-download')
                            callbackGen()
                          }else{
                            callbackGen()
                          }
                      })
                  }else{
                    callbackGen()
                  }
              }
          })
      }
  }
})
