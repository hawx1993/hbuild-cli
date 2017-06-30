/**
 * Created by trigkit4 on 17/6/30.
 */
const request = require('request')

module.exports = function (done) {
    request({
        url: 'https://registry.npmjs.org/hbuild',
        timeout: 1000
    }, function (err, res, body) {
        if (!err && res.statusCode === 200) {
            let latestVersion = JSON.parse(body)['dist-tags'].latest
            done(latestVersion)
        }
    })
}
