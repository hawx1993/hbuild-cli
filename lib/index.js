/**
 * Created by trigkit4 on 2017/6/28.
 */
'use strict'

const co = require('co')
const { isLocalPath, resolve, join, pathExists} = require('./util')
const download = require('./download')
const { repoPath } = require('./config')
const event = require('./event')
const generate = require('./generate')

module.exports = co.wrap(function *({
  localTemplate,
  targetFolder = './',
  config: configFile = 'meta.js'
} = {}) {

  let dest;
  if(isLocalPath( localTemplate )){
      dest = resolve(localTemplate)
  }else {
      dest = join(repoPath, 'hbuild')
      const exists = yield pathExists(dest)
      if(!exists){
          //emit download msg
          event.emit('start-download')
          yield download.repo('hbuild')
          event.emit('stop-download')
      }
  }

  return yield generate({
      dest: dest,
      configFile,
      targetFolder
  })
})
