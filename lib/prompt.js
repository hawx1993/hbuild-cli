'use strict'
const {base,resolve} = require('./util')
const evaluate = require('./eval')
const gitUser = require('./git-user')()

module.exports = function ({
    targetFolder
} = {}) {
    //prompt each prompts item
    return prompt => {
        if (prompt.name === 'name') {
            prompt.default = base(resolve(targetFolder))
        }
        if (prompt.name === 'author') {
            prompt.default = gitUser.name
        }
        if(typeof prompt.when === 'string'){
            const exp = prompt.when;
            prompt.when = answers => evaluate(exp, answers)
        }
        return prompt
    }
}
