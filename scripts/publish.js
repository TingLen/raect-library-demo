const fs = require('fs-extra')
const path = require('path')

/**
 * 1. 遍历项目文件夹，获取文件或文件夹名
 * 2. 在项目文件夹上新建publish文件夹
 * 3. 将项目文件夹目录下复制进publish文件夹
 * 4. 删除publish文件夹不需要发布的文件
 * 5. 通过命令行发布
 */

 const filterFiles = [
   /lib/,
   /dist/,
   /package.json/,
 ]

 const publishPath = path.join(__dirname, '../publish')
 const projectPath = path.join(__dirname, '..')
 const files = fs.readdirSync(projectPath).filter(file => {
   const result = []
  filterFiles.forEach(filterFile => {
    if(filterFile.test(file)) {
      result.push(file)
    }
  })
  return result.length > 0

 }) //当前目录下需要复制的文件
 console.log(files)

 // 新建publish文件夹
 fs.ensureDirSync(publishPath)
 fs.emptyDirSync(publishPath)

 files.forEach(file => {
   const filePath = path.join(projectPath, file)
   const targetFilePath = path.join(publishPath, file)
   console.log()
   fs.copySync(filePath, targetFilePath)
 })

 