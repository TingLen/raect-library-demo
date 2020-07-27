import {isEqual} from "lodash"
import {notification, message} from 'antd'
import NP from 'number-precision'
import hooks from './hooks'
import DTchainProvider from './dtchain_provider'

message.config({
  top: 100
})

const formatCurrency = function (amount) {
  return amount !==null ? formatCurrencyWithAccuracy(amount, 100) : '0.00'
}

const formatCurrencyWithAccuracy = function (amount, accuracy) {
  if (isNaN(amount)) {
    amount = 0
  }
  let result = amount/accuracy
  return number_format(result, 2, '.', ',')
}

function number_format(number = 0, decimals = 0, dec = '.', sep = ',') {
  /*
  * 参数说明：
  * number：要格式化的数字
  * decimals：保留几位小数
  * dec：小数点符号
  * sep：千分位符号
  * */
  number = (number + '').replace(/[^0-9+-Ee.]/g, '')
  let n = !isFinite(+number) ? 0 : +number
  let prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
  let s = ''
  let toFixedFix = function (_n, _prec) {
    let k = Math.pow(10, _prec)
    return '' + Math.ceil(NP.times(_n, k)).toFixed(0) / k
  }

  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
  let re = /(-?\d+)(\d{3})/
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, "$1" + sep + "$2")
  }

  if ((s[1] || '').length < prec) {
    s[1] = s[1] || ''
    s[1] += new Array(prec - s[1].length + 1).join('0')
  }
  return s.join(dec)
}

function add0(m){return m<10?'0'+m:m }
// 将毫秒数转为时间日期
function formatTime(shijianchuo, options = {}) {
  if(!shijianchuo) {
    return '--'
  }
  
  const {hasYear = true, hasTime = true, hasSecond = true, s = '-'} = options

  //shijianchuo是整数，否则要parseInt转换
  let time = new Date(Number(shijianchuo))
  let y = time.getFullYear()
  let m = time.getMonth()+1
  let d = time.getDate()
  let h = time.getHours()
  let mm = time.getMinutes()
  let ss = time.getSeconds()
  // let s = time.getSeconds()+1
  // return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s)
  return `${hasYear ? y+s : ''}${add0(m)}${s}${add0(d)}${hasTime ? ` ${add0(h)}:${add0(mm)}${hasSecond ? ':' + add0(ss) : ''}` : ''}`
}

function smalltoBIG(n) {
  let fraction = ['角', '分']
  let digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  let unit = [['', '万', '亿'], ['', '拾', '佰', '仟']]
  let head = n < 0 ? '欠' : ''
  n = Math.abs(n)

  let s = ''

  for (let i = 0; i < fraction.length; i +=1) {
    s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '')
  }
  s = s || '整'
  n = Math.floor(n)

  for (let i = 0; i < unit[0].length && n > 0; i +=1) {
    let p = ''
    for (let j = 0; j < unit[1].length && n > 0; j +=1) {
      p = digit[n % 10] + unit[1][j] + p
      n = Math.floor(n / 10)
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s
  }
  return head + s.replace(/(零.)*零/, '').replace(/(零.)+/g, '零').replace(/^整$/, '零整')
}

function transformNum(num) {
  let result

  num = num + ""
  result = num.split(',')
  result = result.join('')
  result = result.split('.')

  if (result.length === 1) {
    result = result.join('') + '00'
  } else if (result[1].length === 1) {
    result = result.join('') + '0'
  } else {
    result = result.join('')
  }

  if (isNaN(Number(result))) {
    return '0'
  } else {
    return result
  }
}

function getQueryUrl(key) {
  const url = window.location.href
  if(url.indexOf("?") !== -1){
    const param = url.split("?")[1].split("&")
    const formatParams = {}
    for(let i=0; i<param.length; i +=1){
      formatParams[param[i].split("=")[0]] = param[i].split("=")[1]
    }
    return formatParams[key]
  }
}

function randomWord(length) {
  let str = "",
    arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  // 随机产生
  let range = length || Math.ceil(12 + Math.random() * 20)
  for (let i = 0; i < range; i +=1) {
    let pos = Math.round(Math.random() * (arr.length - 1))
    str += arr[pos]
  }
  return str
}

function getPostfix(file) {
  let postfix
  let num = file.lastIndexOf('.')
  if (num !== -1) {
    postfix = file.substring(num, file.length)
  } else {
    postfix = ''
  }
  return postfix
}

function judgeTime(date) {
  let startTime = Date.parse(new Date(date))
  let endTime = Date.parse(new Date())
  return parseInt((endTime - startTime) / 1000 / 3600 / 24 + '')
}

function compareState(oldData = {}, newData = {}, ignore=['page']) {
  const _obj = {...oldData}
  const obj = {...newData}
  ignore.forEach(el => {
    delete obj[el]
    delete _obj[el]
  })
  if(isEqual(_obj, obj)) {
    return 1
  } else {
    return 0
  }
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 10 },
  },
}

const formItemInModal = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
}

const descriptionsLayout = { xxl: 3, xl: 3, lg: 3, md: 2, sm: 2, xs: 1 }

const getTimestamp = () => {
  return new Date().getTime()
}

function Notification(type, message, description) {
  notification[type]({
    message: message,
    description: description,
  })
}

function Message(type = 'error', content = '系统异常，请与平台方联系', duration = 5) {
  message[type](content, duration)
}

const defaultText = text => {
  return text === 0 ? text : (text || '--')
}

export default {
  formatCurrency,
  formatCurrencyWithAccuracy,
  number_format,
  formatTime,
  smalltoBIG,
  transformNum,
  getQueryUrl,
  randomWord,
  getPostfix,
  judgeTime,
  compareState,
  formItemLayout,
  formItemInModal,
  descriptionsLayout,
  getTimestamp,
  Notification,
  Message,
  defaultText,
  hooks,
  DTchainProvider
}