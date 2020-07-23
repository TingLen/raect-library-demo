import React from 'react'
import * as qiniu from 'qiniu-js'
import moment from 'moment/moment'
import {Button, Upload as AUpload} from 'antd'
import {UploadOutlined} from '@ant-design/icons'
import utils from "../../utils/index"

class Upload extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fileList: props.fileList || [],
      errorUid: null
    }
    this.isComplete = 0
    this.customRequest = this.customRequest.bind(this)
    this.changeFile = this.changeFile.bind(this)
  }

  changeFile({file, fileList}) {
    if(this.state.errorUid) {
      this.setState({errorUid: null})
      return
    }
    const {multiple = false, getSingleFile = false} = this.props
    if (file.status === 'done' || file.status === 'removed') {
      const {setFiles, keys} = this.props
      setFiles && multiple && !getSingleFile ?
        setFiles(keys, fileList, !this.isComplete) :
        setFiles(keys, file, !this.isComplete)
    }
    multiple ?
      this.setState({
        fileList
      }) :
      this.setState({
        fileList: [file]
      })
  }

  isPdf = (src) => {
    return /.pdf$/.test(src)
  }

  checkFileType = (file) => {
    const {type} = file
    const {accept="image/*,.pdf"} = this.props
    const accepts = accept.split(',')
    const types = type.split('/')
    let noMatch = true
    types.forEach(el => {
      accepts.forEach(k => {
        if(k.includes(el)) {
          type !== '' && (noMatch = false)
        }
      })
    })
    noMatch && utils.Message('error', '请上传正确格式文件')
    return noMatch
  }

  customRequest(files) {
    const {fileList} = this.state
    const {token, domain = 'https://files.dev.dtchain.io', filename, start, imgSize = 15, pdfSize = 20, maxLength = 100} = this.props
    const {onSuccess, onError, onProgress, file} = files
    if (this.checkFileType(file)) {
      return
    }
    if( fileList.length === maxLength ){
      utils.Message('error', `文件上传数量达到最大限制，最多能传${maxLength}份文件`)
      return
    }

    const date = moment().format("YYYYMMDD")
    const _this = this
    this.isComplete === 0 && start && start(true)
    this.isComplete += 1
    const putExtra = {
      fname: file.name,
      params: {},
      mimeType: null
    }
    const config = {
      domain: domain,
    }
    let size 
    if(this.isPdf(file.name)){
      size = pdfSize
    } else{
      size = imgSize
    }
    if(files.file.size < size * 1024 * 1024) {
      const observable = qiniu.upload(file, `${filename().key}/${date}/${filename().name}${utils.getPostfix(file.name)}`, token, putExtra, config)
      const observer = {
        next(res) {
          const {total: {percent}} = res
          onProgress({percent})
        },
        error(err) {
          onError(err)
        },
        complete(res) {
          _this.isComplete -= 1
          onSuccess(res)
        }
      }
      observable.subscribe(observer)
    } else {
      this.setState({errorUid: file.uid})
      utils.Message('error', `文件大小超过限制，支持最大${this.isPdf(file.name) ? 'PDF文件' : '图片文件'}体积为${size}M`)
    }
  }

  beforeUpload = (file) => {
    return new Promise(resolve => {
      if(/(.*)\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$/.test(file.name)){
        this.compressImage(file, resolve)
      } else{
        resolve(file)
      }
      
    })
  }

  watermake = context => {
    for (let i = 0; i < 20; i += 1) {
      context.rotate(-15*Math.PI/180) // 水印初始偏转角度
      context.font="50px 黑体"
      context.fillStyle = "rgba(100,100,100, 0.6)"
      for(let j = 0; j < 6; j += 1){
        context.fillText("仅供蓝海数链使用", -800 + j * 420, i * 200)
      }
      context.rotate(15*Math.PI/180)
    }
  }

  compressImage = (file, callback) => {
    const {getBase64=false, water=false} = this.props
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (e) => {
      img.src = e.target.result
    }
    const canvas = document.createElement('canvas')
    const img = document.createElement('img')
    const that = this
    img.src = reader.result
    img.onload = function() {
      const context = canvas.getContext('2d')
      // 图片原始尺寸
      const originWidth = this.width
      const originHeight = this.height
      // 目标尺寸
      let targetWidth = originWidth
      let targetHeight = originHeight
      // 最大尺寸限制
      const maxWidth = 1500
      const maxHeight = 1500
      
      if (originWidth > maxWidth || originHeight > maxHeight) {
        if (originWidth / originHeight > maxWidth / maxHeight) {
          // 更宽，按照宽度限定尺寸
          targetWidth = maxWidth
          targetHeight = Math.round(maxWidth * (originHeight / originWidth))
        } else {
          targetHeight = maxHeight
          targetWidth = Math.round(maxHeight * (originWidth / originHeight))
        }
      }
          
      // canvas对图片进行缩放
      canvas.width = targetWidth
      canvas.height = targetHeight
      // 清除画布
      context.clearRect(0, 0, targetWidth, targetHeight)
      // 图片压缩
      context.drawImage(img, 0, 0, targetWidth, targetHeight)

      // 图片水印
      water && that.watermake(context)

      // canvas转为blob并上传
      canvas.toBlob(function(blob){
        blob.name = file.name
        blob.uid = file.uid
        getBase64 && (blob.base64 = canvas.toDataURL("image/jpeg"))
        callback(blob)
      })
    }
  }

  componentDidUpdate(prevProps) {
    this.props.fileList !== prevProps.fileList && this.setState({fileList: this.props.fileList})
  }

  render() {
    const defaultButton = <Button icon={<UploadOutlined />}>点击上传</Button>
    const {multiple = false, children = defaultButton, showBox = true, listType = 'picture', accept="image/*,.pdf", disabled=false} = this.props
    const {fileList} = this.state
    return [
      <AUpload accept={accept}
        key={1}
        listType={listType}
        customRequest={this.customRequest}
        multiple={multiple}
        onChange={this.changeFile}
        fileList={fileList}
        showUploadList={showBox}
        beforeUpload={this.beforeUpload}
        // transformFile={file => this.compressImage(file)}
        disabled={disabled}
      >
        {children}
      </AUpload>
    ]
  }
}

export default Upload
