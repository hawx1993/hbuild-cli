
## Introduced


<p align="center">

[![npm](https://img.shields.io/npm/v/hbuild-cli.svg?style=flat)](https://www.npmjs.com/package/hbuild-cli)  [![GitHub issues](https://img.shields.io/github/issues/hawx1993/hbuild-cli.svg)](https://github.com/hawx1993/hbuild-cli/issues)  [![GitHub stars](https://img.shields.io/github/stars/hawx1993/hbuild-cli.svg)](https://github.com/hawx1993/hbuild-cli/stargazers)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/hawx1993/hbuild-cli/master/LICENSE)
</p>




this project is a cli tool for [hbuild](https://github.com/hawx1993/hbuild) project, which is used for rapidly build more powerful and easy to use project starter kit

![image](https://user-images.githubusercontent.com/5305263/27747034-2c958296-5dfc-11e7-9364-075c9f613185.png)



## get started

```bash
 $ sudo npm install hbuild-cli -g
```

## Usage

```bash
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

if online package's version is newer,`hbuild-cli` will download it rather than read it from cache

## Contributing


1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT © [hawx1993](https://github.com/hawx1993)
