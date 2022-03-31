module.exports = [
    {
      name: 'name',
      message: 'Project name:',
      default: '{outFolder}'
    },
    {
      name: 'language',
      message: 'Programming language:',
      choices: [
        { name: 'JavaScript', value: 'js' },
        { name: 'TypeScript', value: 'ts' }
      ],
      type: 'list',
      default: 'js'
    },
    {
      name: 'pm',
      message: 'Package manager:',
      choices: [
        { name: 'Yarn', value: 'yarn' },
        { name: 'Npm', value: 'npm' }
      ],
      type: 'list',
      default: 'yarn'
    },
    {
      name: 'vcs',
      message: 'Version control system:',
      type: 'list',
      choices: [
        { name: 'Git', value: 'git' },
        { name: 'None', value: 'none' }
      ],
      default: 'git'
    }
  ]