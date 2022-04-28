// import _ from 'lodash'
// import Devco from '@arvidwedtstein/devcojs'

class Devco {
    constructor(options = {}) {
        this.options = options
        this.document = options.el
        this.init()
    }
    init() {

    }
    render() {
        this.getOptions()
        this.getData()
        this.getTemplate()
        this.getComponents()
        this.getElements()
        this.getEvents()
        this.getScripts()
        this.getStylesheets()
        this.getScripts()
    }
    getTemplate() {
        return this.options.template
    }

    getData() {
        return this.options.data
    }

    getDataByKey(key) {
        return this.options.data[key]
    }

    getDataByKeyPath(keyPath) {
        return _.get(this.options.data, keyPath)
    }

    getOptions() {
        return this.options
    }
}
