const fs = require('fs-extra')
const path = require('path')
const less = require('less')
const csso = require('csso')

const distPath = path.join(__dirname, '../dist')
const distLessPath = path.join(distPath, 'dtchain-fe.less')
const distCssPath = path.join(distPath, 'dtchain-fe.css')
const distCssMinPath = path.join(distPath, 'dtchain-fe.min.css')

less.render(fs.readFileSync(distLessPath).toString(), (err, output) => {
  if(!err) {
    fs.outputFileSync(distCssPath, output['css'])
    const cssContent = csso.minify(output['css'])['css']
    fs.outputFileSync(distCssMinPath, cssContent)
  }
})