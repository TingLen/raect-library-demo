const fs = require('fs-extra')
const path = require('path')
const less = require('less')
const csso = require('csso')

/**
 * 1. less to css
 * 2. generate style/index.js, style/css.js
 * 3. minify css file
 */

