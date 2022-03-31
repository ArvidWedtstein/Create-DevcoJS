#!/usr/bin/env node
const path = require('path')
const fs = require('fs')
const sao = require('sao')
const cac = require('cac')
const chalk = require('chalk');
const envinfo = require('envinfo')
const { version } = require('../package.json');
const chalkAnimation = require('chalk-animation')

const generator = path.resolve(__dirname, './')

const cli = cac('create-devcojs');

const showEnvInfo = async () => {
  console.log(chalk.bold('\nEnvironment Info:'))
  const result = await envinfo
    .run({
      System: ['OS', 'CPU'],
      Binaries: ['Node', 'Yarn', 'npm'],
      Browsers: ['Chrome', 'Edge', 'Firefox', 'Safari'],
      npmGlobalPackages: ['nuxt', 'create-nuxt-app']
    })
  console.log(result)
  process.exit(1)
}

const run = async () => {
  cli
    .command('[out-dir]', 'Generate in a custom directory or current directory')
    .option('-e, --edge', 'To install `nuxt-edge` instead of `nuxt`')
    .option('-i, --info', 'Print out debugging information relating to the local environment')
    .option('--answers <json>', 'Skip all the prompts and use the provided answers')
    .option('--verbose', 'Show debug logs')
    .option('--overwrite-dir', 'Overwrite the target directory')
    .action((outDir = '.', cliOptions) => {
      console.log(cliOptions)
      if (cliOptions.info) {
        return showEnvInfo()
      }
      console.log()
      console.log(chalk`{cyan create-devcojs-app v${version}}`)
      
      

      const { answers, overwriteDir, verbose } = cliOptions

      const logLevel = verbose ? 4 : 2

      console.log("generator", generator)
      console.log("outdir", outDir)
      console.log("loglevel", logLevel)
      console.log("answers", answers)
      console.log("clioptions", cliOptions)

      // if (fs.existsSync(outDir) && fs.readdirSync(outDir).length && !overwriteDir) {
      //   const baseDir = outDir === '.' ? path.basename(process.cwd()) : outDir
      //   return console.error(chalk.red(
      //     `Could not create project in ${chalk.bold(baseDir)} because the directory is not empty.`))
      // }

      console.log(chalk`✨  Generating Devco.js project in {cyan ${outDir}}`)

      

      
      sao({ generator, outDir, logLevel, answers, cliOptions })
        .run()
        .catch(err => {
          console.trace(err)
          process.exit(1)
        })
    })


  
  // prompts.forEach(async (prompt) => {
  //     const { name, message, type, choices, default: defaultValue } = prompt
  //     const answer = await inquirer.prompt([{
  //         name,
  //         message,
  //         type,
  //         choices,
  //         default: defaultValue
  //     }])
  //     console.log(chalk.green(`${name}: ${answer[name]}`))
  // })
  // const answers = await inquirer.prompt({
  //     name: "vcs",
  //     type: "list",
  //     message: "Version control system:",
  //     choices: [
  //         { name: 'Git', value: 'git' },
  //         { name: 'None', value: 'none' }
  //     ]
  // })

  cli.help()

  cli.version(version)

  cli.parse()
}

try {
  run()
} catch (err) {
  if (err.name === 'CACError' && err.message.startsWith('Unknown option')) {
    console.error()
    console.error(chalk.red(err.message))
    console.error()
    cli.outputHelp()
  } else {
    console.error()
    console.error(err)
  }
}