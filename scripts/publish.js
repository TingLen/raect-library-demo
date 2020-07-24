const fs = require('fs-extra')
const path = require('path')

/**
 * 1. 遍历项目文件夹，获取文件或文件夹名
 * 2. 在项目文件夹上新建publish文件夹
 * 3. 将项目文件夹目录下复制进publish文件夹
 * 4. 删除publish文件夹不需要发布的文件
 * 5. 通过命令行发布
 */

 const publishPath = path.join(__dirname, '../publish')

 const files = fs.readdirSync(__dirname, '..') //当前目录下的所有文件

 // 新建publish文件夹
 fs.ensureDirSync(publishPath)
 fs.emptyDirSync(publishPath)

 files.forEach(file => {
   const filePath = path.join(__dirname, file)
   const targetFilePath = path.join(publishPath, file)
   fs.copySync(filePath, targetFilePath)
 })

 