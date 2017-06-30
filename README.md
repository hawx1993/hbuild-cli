
## Introduced

<p align="center">

[![npm](https://img.shields.io/npm/v/npm.svg)](https://www.npmjs.com/package/hbuild-cli)  [![GitHub issues](https://img.shields.io/github/issues/hawx1993/hbuild-cli.svg)](https://github.com/hawx1993/hbuild-cli/issues)  [![GitHub stars](https://img.shields.io/github/stars/hawx1993/hbuild-cli.svg)](https://github.com/hawx1993/hbuild-cli/stargazers)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/hawx1993/hbuild-cli/master/LICENSE)
</p>


this project is a cli tool for [hbuild](https://github.com/hawx1993/hbuild) project, which is used for rapidly build more powerful and easy to use project starter kit

## get started

```bash
 $ sudo npm install hbuild-cli -g
```

## Usage

``` bash
$ h init new-project
```

## Local Templates

when you clone this project,you can  use a template on your local file system:

```bash
$ git clone git@github.com:hawx1993/hbuild.git
#custome your own template
$ h init ./hbuild new-project
```
## cache

when you first download [hbuild](https://github.com/hawx1993/hbuild) by hbuild-cli, which can be cached in `/user/home/.hbuild/repos/hbuild`, the next time when you execute `h init project-name` command,which will read from cache.


## License

MIT © [hawx1993](https://github.com/hawx1993)
