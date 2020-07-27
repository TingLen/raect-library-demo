const fs = require('fs-extra')
const path = require('path')
const less = require('less')
const csso = require('csso')

/**
 * 1. less to css
 * 2. generate style/index.js, style/css.js
 * 3. minify css file
 */


const lessScriptContent = () => `
"use strict"
require("./index.less")
`

const cssScriptContent = () => `
"use strict"
require("./index.css")
`
const componentsPath = path.join(__dirname, '../lib')

const isStyleDir = filePath => /style$/.test(filePath)

const parseLessToCss = dir => {
  const files = fs.readdirSync(dir)
  files.forEach(file => {
    const filePath = path.join(dir, file)
    if(isStyleDir(filePath)) {
      const lessPath = path.join(filePath, 'index.less')
      const cssPath = path.join(filePath, 'index.css')
      const lessScriptPath = path.join(filePath, 'index.js')
      const cssScriptPath = path.join(filePath, 'css.js')

      // parse less to css and generate css file
      less.render(fs.readFileSync(lessPath).toString(), (err, output) => {
        if(!err) {
          const cssContent = csso.minify(output['css'])['css']
          fs.outputFileSync(cssPath, cssContent)
        }
      })
      // generate style/index.js and style/css.js
      fs.outputFileSync(lessScriptPath, lessScriptContent())
      fs.outputFileSync(cssScriptPath, cssScriptContent())
    }
  })
}

const components = fs.readdirSync(componentsPath)

components.forEach(component => parseLessToCss(path.join(componentsPath, component)))