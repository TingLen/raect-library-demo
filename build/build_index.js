const fs = require('fs-extra')
const path = require('path')
const babel = require('@babel/core')
const lodash = require('lodash')

/**
 * 1. 生成lib/index.js文件
 * 2. 遍历 lib/components下子集所有文件夹
 * 3. 根据遍历结果得到component name，依据驼峰转化写入index.js文件
 * 4. 完成遍历后对lib/index.js进行babel编译，重新生成lib/index.js文件
 */

 const indexPath = path.join(__dirname, '../lib/index.js')
 const componentsPath = path.join(__dirname, '../lib')

 const babelConfig = {
  configFile: path.join(__dirname, '../babel.config.json')
}


 const indexContentTemplate = name => `
 export {default as ${lodash.upperFirst(lodash.camelCase(name))}} from './${name}'
 `
 const components = fs.readdirSync(componentsPath)


 const indexContent = []

 components.forEach(component => {
  indexContent.push(indexContentTemplate(component))
 })

 fs.outputFileSync(indexPath, indexContent.join(''))  // generator lib/index.js

 const {code} = babel.transformFileSync(indexPath, babelConfig)
 fs.removeSync(indexPath)
 fs.outputFileSync(indexPath, code)
