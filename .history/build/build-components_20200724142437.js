const fs = require('fs-extra')
const path = require('path')
const babel = require('@babel/core')

const libPath = path.join(__dirname, '../lib')
const libComponentsPath = path.join(libPath, 'components')
const srcPath = path.join(__dirname, '../src')
const srcComponentsPath = path.join(srcPath, 'components')

const complie = dir => {
  /**
   * 1. 遍历文件夹下所有文件
   * 2. 除js文件，style文件夹之外的file与dir，删除
   * 3. 对js文件进行babel的编译
   */
}

// 删除lib文件
fs.ensureDir(libPath)
fs.emptyDirSync(libPath)

// 将src/components 复制到 lib/components
fs.copySync(srcComponentsPath, libComponentsPath)

// 遍历执行complie
const components = fs.readdirSync(libComponentsPath)
components.forEach(component => complie(component))