const { merge, sortByKey } = require('./util')

module.exports = {
  requireFile (filename) {
    try {
      return require(filename)
    } catch (error) {
      console.log(`Error loading ${filename}`, error)
      return {}
    }
  },
  requireJSON (filename) {
    return JSON.parse(JSON.stringify(this.requireFile(filename)))
  },
  loadPackage (name, generator) {
    if (!name || name === 'none') {
      return {}
    }
    const prefix = name === 'devco' ? 'devco' : `frameworks/${name}`
    const pkg = this.requireJSON(`../../cna-template/template/${prefix}/package.json`)
    const pkgHandler = this.requireFile(`../../cna-template/template/${prefix}/package.js`)
    return pkgHandler.apply ? pkgHandler.apply(pkg, generator) : pkg
  },
  load (generator) {
    const devcoPkg = this.loadPackage('devco', generator)
    const uiPkg = this.loadPackage(generator.answers.ui, generator)
    const testPkg = this.loadPackage(generator.answers.test, generator)
    const pkg = merge(devcoPkg, uiPkg, testPkg)
    pkg.dependencies = sortByKey(pkg.dependencies)

    if (pkg.devDependencies) {
      pkg.devDependencies = sortByKey(pkg.devDependencies)
    }
    
    return pkg
  }
}