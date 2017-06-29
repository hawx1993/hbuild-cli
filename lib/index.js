/**
 * Created by hwx34 on 2017/6/28.
 */
'use strict'

const co = require('co')
const { isLocalPath, resolve, join ,isRepo} = require('./util')
const download = require('./download')
const { repoPath } = require('./config')
const event = require('./event')
const generate = require('./generate')

module.exports = co.wrap(function *({
  targetFolder = './',
  configFile = 'meta.js'
} = {}) {
  let dest = join(repoPath, targetFolder)
  //emit download msg
  event.emit('start-download')
  yield download.repo('hbuild')
  event.emit('stop-download')

  return yield generate({
      dest: dest,
      configFile,
      targetFolder
  })
})
