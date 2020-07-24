const fs = require('fs-extra')
const path = require('path')
const babel = require('@babel/core')

const libPath = path.join(__dirname, '../lib')
const libComponentsPath = path.join(libPath, 'components')
const srcPath = path.join(__dirname, '../src')
const srcComponentsPath = path.join(srcPath, 'components')

const babelConfig = {
  configFile: path.join(__dirname, '../babel.config.json')
}

const isCode = filePath => /(\.jsx?)|(style)$/.test(filePath)
const isScript = filePath => /\.jsx?$/.test(filePath)
const isUtils = filePath => /_utils$/.test(filePath)

const compile = dir => {
  // 单独处理_utils文件夹
  if(isUtils(dir)) {
    /**
     * 1. 遍历_utils文件夹下所有js文件
     * 2. 对js文件进行babel编译
     */
    const utils = fs.readdirSync(dir)
    utils.forEach(util => {
      const utilPath = path.join(dir, util)
      const {code} = babel.transformFileSync(utilPath, babelConfig)
      fs.removeSync(utilPath)
      fs.outputFileSync(utilPath, code)
    })
  } else {
  /**
   * 1. 遍历文件夹下所有文件
   * 2. 除js文件，style文件夹之外的file与dir，删除
   * 3. 对js文件进行babel的编译
   */
  const files = fs.readdirSync(dir)
  files.forEach(file => {
    const filePath = path.join(dir, file)
    if(!isCode(filePath)) {
      fs.removeSync(filePath)
    } else if(isScript(filePath)) {
      const {code} = babel.transformFileSync(filePath, babelConfig)
      fs.removeSync(filePath)
      fs.outputFileSync(path.join(dir, 'index.js'), code)
    }

  })
  }
  
}

// 删除lib文件
fs.ensureDirSync(libPath)
fs.emptyDirSync(libPath)

// 将src/components 复制到 lib/components
fs.copySync(srcComponentsPath, libComponentsPath)

// 遍历执行compile
const components = fs.readdirSync(libComponentsPath)
components.forEach(component => compile(path.join(libComponentsPath, component)))