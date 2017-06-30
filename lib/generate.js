'use strict'
const path = require('path')
const co = require('co')
const chalk = require('chalk')
const copy = require('kopy')
const config = require('./config')
const prompt = require('./prompt')
const { resolve, join } = require('./util')
const log = require('./logger')

module.exports = co.wrap(function * ({
   dest,
   configFile,
   targetFolder,
   log: logs
   } = {}) {
    let projectConfig = yield config.getConfig(dest, configFile)

    let prompts
    let filters
    let templateEngine
    let templateOptions
    let postAction

    if (projectConfig) {
        // file filters
        filters = projectConfig.filters
        postAction = projectConfig.post

        if(projectConfig.template === 'handlebars'){
            templateEngine = require('jstransformer-handlebars')
        }else {
            templateEngine = projectConfig.template
        }
        templateOptions = projectConfig.templateOptions

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
    const folderPath = resolve(targetFolder)
    const templateFolder = projectConfig ? 'template' : './'
    const folderName = path.basename(folderPath)
    const context = {
        folderPath,
        folderName,
        isNewFolder: targetFolder !== './'
    }

    return yield copy(join(dest, templateFolder), targetFolder, {
        template: templateEngine,
        templateOptions,
        prompts,
        data: {_: context},
        filters,
        clean: false
    }).then(res => {
        if(!logs) return res
        const ctx = Object.assign({}, res, {
            log,
            folderName,
            chalk
        })
        const action = postAction && postAction(ctx)
        if (action && action.then) return action.then(() => res)
        if (!postAction) {
            log.success(`Successfully generated into ${chalk.yellow(folderName)}`)
        }

        return res
    })
})
