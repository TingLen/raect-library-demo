const fs = require('fs-extra')
const path = require('path')
const less = require('less')
const csso = require('csso')

/**
 * 1. less to css
 * 2. generate style/index.js, style/css.js
 * 3. minify css file
 */

const componentsPath = path.join(__dirname, '../lib/components')
const stylePath = path.join(componentsPath, 'style')

const isStyleDir = filePath => /style$/.test(filePath)
const isLess = filePath => /\.less$/.test(filePath)

const parseLessToCss = dir => {
  const files = fs.readdirSync(dir)
  files.forEach(file => {
    const filePath = path.join(dir, file)
    if(isStyleDir(filePath)) {
      const lessPath = path.join(filePath, 'index.less')
      const cssPath = path.join(filePath, 'index.css')
      less.render(fs.readFileSync(lessPath).toString(), (err, output) => {
        if(!err) {
          fs.outputFileSync(cssPath, output['css'])
        }
      })
    }
  })
}

const components = fs.readdirSync(componentsPath)

components.forEach(component => parseLessToCss(path.join(componentsPath, component)))