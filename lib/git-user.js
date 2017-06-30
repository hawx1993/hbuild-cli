/**
 * Created by trigkit4 on 2017/6/21.
 */
const exec = require('child_process').execSync;

//获取git用户信息
module.exports = function () {
  let gitUser = {};
  try{
      gitUser.name = exec('git config --get user.name');
      gitUser.email = exec('git config --get user.email')
  } catch (e) {console.log(e.message)}
      gitUser.name = gitUser.name && JSON.stringify(gitUser.name.toString().trim()).slice(1, -1);
      gitUser.email = gitUser.email && (' <' + gitUser.email.toString().trim() + '>');
  return gitUser
}
