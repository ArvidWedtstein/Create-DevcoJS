const gradient = require('gradient-string')
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
      message: gradient.morning('Package manager:'),
      choices: [
        { name: 'Npm', value: 'npm' },
        { name: 'Yarn', value: 'yarn' }
      ],
      type: 'list',
      default: 'npm'
    },
    {
      name: 'style',
      message: gradient.morning('Style??:'),
      choices: [
        { name: 'CSS', value: 'css' },
        { name: 'SCSS', value: 'scss' },
        { name: 'SASS', value: 'sass' },
        { name: 'Tailwind', value: 'tailwind' },
      ],
      type: 'list',
      default: 'yarn'
    },
    {
      when: ({ style }) => style == 'tailwind',
      name: 'areyousure',
      message: gradient.morning('Are you sure you want to use Tailwind??:'),
      choices: [
        { name: 'Yes', value: 'yes' },
        { name: 'No', value: 'no' }
      ],
      type: 'list',
      default: 'no'
    },
    {
      name: 'vcs',
      message: 'Version control system:',
      type: 'list',
      choices: [
        { name: 'Git', value: 'git' },
        { name: 'None', value: 'none' }
      ],
      default: 'git',
    }
  ]