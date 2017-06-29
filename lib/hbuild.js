'use strict'
const cli = require('cac')()
const ora = require('ora')
const chalk = require('chalk')
const update = require('update-notifier')
const hbuild = require('./index')
const event = require('./event')
const logger = require('./logger');
const { isLocalPath } = require('./util')

cli.command('*', 'rapid build project starter kit',(input, flags) => {
  const command = input[0];

  if(!command){
    return cli.showHelp()
  }
})

cli.command('init', 'init download project starter kit', (input, flags) => {
    const template = input[0];//project name
    const spinner = ora('downloading hbuild')
    if(!template){
        return cli.showHelp()
    }
    //listen msg
    event.on('start-download', () => {
        spinner.start()
    })
    event.on('stop-download', () => {
        spinner.stop()
    })

    const options = Object.assign({
        targetFolder: template
    }, flags)
    return hbuild(options)
        .catch(err => {
            spinner.stop()
            if(err) logger.log(err.message)

            process.exit(1)
        })
})
cli.parse()
cli.usage(chalk.yellow('h init project-name'))
update({pkg: cli.pkg}).notify()
