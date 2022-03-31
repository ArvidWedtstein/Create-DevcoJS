const path = require('path')
const sao = require('sao')
const saoConfig = require('../lib/soafile')

const generator = path.join(__dirname, '../lib')

const getPkgFields = (pkg) => {
  pkg = JSON.parse(pkg)
  delete pkg.name
  delete pkg.version
  return pkg
}

const normalizeNewlines =
  string => string.replace(/\r\n/g, '\n')

const verifyFileList = async (t, answers = {}) => {
    console.log(answers)
  const stream = await sao.mock({ generator }, answers)
  t.snapshot(stream.fileList, 'Generated files')

}

const verifyPkg = async (t, answers = {}) => {
  const stream = await sao.mock({ generator }, answers)
  const pkg = await stream.readFile('package.json')
  t.snapshot(getPkgFields(pkg), 'package.json')
}


const verifyAnswers = async (t, answers = {}) => {
  await verifyFileList(t, answers)
  await verifyPkg(t, answers)
}



for (const prompt of saoConfig.prompts) {
  if (Array.isArray(prompt.choices)) {
    if (prompt.type === 'checkbox') {
      const choiceNames = prompt.choices.map(choice => choice.name)
      const choiceValues = prompt.choices.map(choice => choice.value)

      console.log(choiceNames)
      console.log("values", choiceValues)
      // test(`verify ${prompt.name}: ${choiceNames.join(', ')}`, async (t) => {
      //   const answers = { [prompt.name]: choiceValues }
      //   await verifyAnswers(t, answers)
      // })
    }
    for (const choice of prompt.choices) {
      // test(`verify ${prompt.name}: ${choice.name}`, async (t) => {
      //   const answers = { [prompt.name]: prompt.type === 'checkbox' ? [choice.value] : choice.value }
      //   await verifyAnswers(t, answers)
      // })
    }
  }
}