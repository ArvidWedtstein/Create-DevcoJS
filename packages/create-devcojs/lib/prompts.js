const gradient = require('gradient-string')
module.exports = [
    {
      name: 'name',
      message: 'Prosjektnavn:',
      default: '{outFolder}'
    },
    {
      name: 'language',
      message: 'Programmeringsspråk:',
      choices: [
        { name: 'JavaScript', value: 'js' },
        { name: 'TypeScript', value: 'ts' }
      ],
      type: 'list',
      default: 'js'
    },
    {
      name: 'pm',
      message: gradient.morning('Velg Pakkeansvarlig:'),
      choices: [
        { name: 'Npm', value: 'npm' },
        { name: 'Yarn', value: 'yarn' }
      ],
      type: 'list',
      default: 'npm'
    },
    {
      name: 'style',
      message: gradient.morning('Stil??:'),
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
      message: gradient.morning('Er du sikker på at du vil bruke Tailwind??:'),
      choices: [
        { name: 'Yes', value: 'yes' },
        { name: 'No', value: 'no' }
      ],
      type: 'list',
      default: 'no'
    },
    {
      name: 'vcs',
      message: 'Versjonskontrollsystem:',
      type: 'list',
      choices: [
        { name: 'Git', value: 'git' },
        { name: 'None', value: 'none' }
      ],
      default: 'git',
    }
  ]