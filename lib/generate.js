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
   targetFolder
   } = {}) {
    // get meta.js content
    let projectConfig = yield config.getConfig(dest, configFile)
    let prompts
    let filters
    let templateEngine
    let templateOptions
    let completeFn

    if (projectConfig) {
        // config files data
        filters = projectConfig.filters
        completeFn = projectConfig.completeMessage

        if(projectConfig.template === 'handlebars'){
            templateEngine = require('jstransformer-handlebars')
        }else {
            templateEngine = projectConfig.template
        }
        templateOptions = projectConfig.templateOptions

        // get  prompts data
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
        folderName
    }

    return yield copy(join(dest, templateFolder), targetFolder, {
        template: templateEngine,
        templateOptions,
        prompts,
        data: {_: context},
        filters,
        clean: false
    }).then(res => {

        if(!log) return res
        const ctx = Object.assign({}, res, {
            log,
            folderName,
            chalk
        })
        const action = completeFn && completeFn(ctx)
        if (action && action.then) return action.then(() => res)

        if (!completeFn) {
            log.success(`Successfully generated into ${chalk.yellow(folderName)}`)
        }

        return res
    })
})
