/**
 * Created by trigkit4 on 2017/6/21.
 */
const  ora  = require('ora')
const download  = require('download-git-repo')
const { join ,exists}  = require('./util')
const { fetal } = require('./logger')
const { repoPath } = require('./config')
const rm = require('rimraf').sync
const repo = 'hawx1993/hbuild'

exports.repo =  function (folderName) {
  return new Promise((resolve , reject) => {
    //download repo and cached it
    const dest = join(repoPath, folderName)
    //prevent duplicate generate folders
    if (exists(dest)) rm(dest)
    download(repo, dest , (err) => {
      if(err){
        fetal(`download failed:${ err.message.trim() }`);
        reject(err)
      }
      resolve(dest)
    })
  })
}
