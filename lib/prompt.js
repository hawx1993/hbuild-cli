'use strict'
const path = require('path')
const evaluate = require('./eval')

module.exports = function ({
    targetFolder
} = {}) {
    let gitUser

    return prompt => {
        if (prompt.role === 'folder:name') {
            prompt.default = path.basename(path.resolve(process.cwd(), targetFolder))
        }
        if (prompt.role === 'git:name') {
            gitUser = gitUser || require('./git-user')()
            prompt.default = gitUser.name
        }
        if (prompt.role === 'git:email') {
            gitUser = gitUser || require('./git-user')()
            prompt.default = gitUser.email
        }

        if(typeof prompt.when === 'string'){
            const exp = prompt.when;
            prompt.when = answers => evaluate(exp, answers)
        }
        return prompt
    }
}
