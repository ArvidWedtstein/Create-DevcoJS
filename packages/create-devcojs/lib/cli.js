#!/usr/bin/env node
const path = require('path')
const fs = require('fs')
const sao = require('sao')
const cac = require('cac')
const chalk = require('chalk');
const envinfo = require('envinfo')
const { version } = require('../package.json');
const gradient = require('gradient-string')
const box = require('./box')
const generator = path.resolve(__dirname, './')

const cli = cac('create-devcojs');

const showEnvInfo = async () => {
  console.log(chalk.bold('\nMiljøinfo:'))
  const result = await envinfo
    .run({
      System: ['OS', 'CPU'],
      Binaries: ['Node', 'Yarn', 'npm'],
      Browsers: ['Chrome', 'Edge', 'Firefox', 'Safari'],
    })
  process.exit(1)
}

const run = async () => {
  cli
    .command('[out-dir]', 'Generer i ein egendefinert mappe eller gjeldende mappe')
    .option('-i, --info', 'Skriv ut feilsøkingsinformasjon knyttet til lokalmiljøet')
    .action((outDir = '.', cliOptions) => {
      if (cliOptions.info) {
        return showEnvInfo()
      }

      // Beer Gradient: [{color: "#e3af09", pos: 0}, {color: "#fbc80b", pos: 0.3}]
      console.log(gradient(["#5433FF", "#20BDFF", "#A5FECB"]).multiline(box(4, `create-devcojs-app v${version}`).join('\n')))


      const { answers, overwriteDir, verbose } = cliOptions

      const logLevel = verbose ? 4 : 2

      if (fs.existsSync(outDir) && fs.readdirSync(outDir).length && !overwriteDir) {
        const baseDir = outDir === '.' ? path.basename(process.cwd()) : outDir
        return console.error(gradient(["#F00000", "#DC281E"]).multiline(box(4, `Kunne ikkje opprettet prosjektet ${baseDir} fordi mappen ikkje er tom.`).join('\n'), {interpolation: 'rgb'}))
      }

      var genString = new String(`✨ Genererer Devco.js prosjekt i ${outDir}`)


      
      sao({ generator, outDir, logLevel, answers, cliOptions })
        .run()
        .catch(err => {
          console.trace(err)
          process.exit(1)
        })
    })


  cli.help()

  cli.version(version)

  cli.parse()
}

try {
  run()
} catch (err) {
  if (err.name === 'CACError' && err.message.startsWith('Unknown option')) {
    console.error(box(4, err.message, "red").join('\n'))
    cli.outputHelp()
  } else {
    console.error(box(4, err, "red"))
  }
}