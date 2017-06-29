'use strict'
const path = require('path')
const co = require('co')
const chalk = require('chalk')
const copy = require('kopy')
const config = require('./config')
const prompt = require('./prompt')

module.exports = co.wrap(function * ({
   dest,
   configFile,
   targetFolder
   } = {}) {
    const projectConfig = yield config.getConfig(dest, configFile)
    let skipInterpolation
    let prompts
    let filters
    let postAction

    if (projectConfig) {
        // skip rendering some files
        skipInterpolation = projectConfig.skipInterpolation
        // file filters
        filters = projectConfig.filters
        postAction = projectConfig.post

        // get data from prompts
        if (projectConfig.prompts) {
            if (Array.isArray(projectConfig.prompts)) {
                prompts = projectConfig.prompts
            } else {
                prompts = Object
                    .keys(projectConfig.prompts)
                    .map(name => Object.assign({
                        name
                    }, projectConfig.prompts[name]))
            }
            prompts = prompts.map(prompt({targetFolder}))
        }
    }

    const templateFolder = projectConfig ? 'template' : './'
    const folderName = path.basename(path.resolve(process.cwd(), targetFolder))
    const context = {
        chalk,
        folderName,
        isNewFolder: targetFolder !== './'
    }

    return yield copy(path.join(fromPath, templateFolder), targetFolder, {
        engine: 'ejs',
        skipInterpolation,
        prompts,
        data: {_: context},
        filters,
        clean: false
    }).then(files => {
        const action = postAction && postAction(context)
        if (action && action.then) return action.then(() => files)
        return files
    })
})
