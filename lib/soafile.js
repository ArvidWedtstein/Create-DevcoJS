const { dirname, join, relative } = require('path')
const fs = require('fs')
const pkg = require('./package')
const cnaTemplateDir = join(dirname(require.resolve('../packages/cna-template/package.json')))
const templateDir = join(cnaTemplateDir, 'template')

const addExecutable = filename => new Promise(
  resolve => fs.chmod(filename, 0o755, resolve)
)

module.exports = {
  prompts: require('./prompts'),
  templateData () {
    const pm = this.answers.pm === 'yarn' ? 'yarn' : 'npm'
    const pmRun = this.answers.pm === 'yarn' ? 'yarn' : 'npm run'
    const { cliOptions = {} } = this.sao.opts
    const edge = cliOptions.edge ? '-edge' : ''

    console.log(pm, pmRun)
    return {
      edge,
      pm,
      pmRun
    }
  },
  actions () {
    console.log(this.answers.name)


    const actions = [{
      type: 'add',
      files: '**',
      templateDir: join(templateDir, 'devco'),
      filters: {}
    }]

    actions.push({
      type: 'move',
      patterns: {
        gitignore: '.gitignore',
        '_package.json': 'package.json',
        '_.prettierignore': '.prettierignore',
        '_.prettierrc': '.prettierrc',
        '_.eslintrc.js': '.eslintrc.js',
        '_jsconfig.json': 'jsconfig.json',
        '_stylelint.config.js': 'stylelint.config.js',
        '_commitlint.config.js': 'commitlint.config.js',
        'semantic.yml': '.github/semantic.yml',
        'dependabot.yml': '.github/dependabot.yml'
      }
    })

    const generator = this
    actions.push({
      type: 'modify',
      files: 'package.json',
      handler (data) {
        return { ...data, ...pkg.load(generator) }
      }
    })

    // // For compiling package.json
    actions.push({
      type: 'add',
      files: 'package.json',
      templateDir: this.outDir
    })

    actions.push({
      type: 'remove',
      files: 'package.js'
    })
    console.log(actions)
    return actions
  },
  async completed () {
    if (this.answers.vcs === 'git') {
      this.gitInit()
    }


    await this.npmInstall({ npmClient: this.answers.pm })


    const chalk = this.chalk
    const isNewFolder = this.outDir !== process.cwd()
    const relativeOutFolder = relative(process.cwd(), this.outDir)
    const cdMsg = isNewFolder ? chalk`\t{cyan cd ${relativeOutFolder}}\n` : ''
    const pmRun = this.answers.pm === 'yarn' ? 'yarn' : 'npm run'

    console.log(chalk`\n🎉  {bold Successfully created project} {cyan ${this.answers.name}}\n`)

    console.log(chalk`  {bold To get started:}\n`)
    console.log(chalk`${cdMsg}\t{cyan ${pmRun} dev}\n`)

    console.log(chalk`  {bold To build & start for production:}\n`)
    console.log(chalk`${cdMsg}\t{cyan ${pmRun} build}`)
    console.log(chalk`\t{cyan ${pmRun} start}\n`)

  }
}