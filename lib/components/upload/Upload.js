"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var qiniu = _interopRequireWildcard(require("qiniu-js"));

var _moment = _interopRequireDefault(require("moment/moment"));

var _antd = require("antd");

var _icons = require("@ant-design/icons");

var _index = _interopRequireDefault(require("../../utils/index"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Upload = /*#__PURE__*/function (_React$Component) {
  _inherits(Upload, _React$Component);

  var _super = _createSuper(Upload);

  function Upload(props) {
    var _this2;

    _classCallCheck(this, Upload);

    _this2 = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this2), "isPdf", function (src) {
      return /.pdf$/.test(src);
    });

    _defineProperty(_assertThisInitialized(_this2), "checkFileType", function (file) {
      var type = file.type;
      var _this2$props$accept = _this2.props.accept,
          accept = _this2$props$accept === void 0 ? "image/*,.pdf" : _this2$props$accept;
      var accepts = accept.split(',');
      var types = type.split('/');
      var noMatch = true;
      types.forEach(function (el) {
        accepts.forEach(function (k) {
          if (k.includes(el)) {
            type !== '' && (noMatch = false);
          }
        });
      });
      noMatch && _index["default"].Message('error', '请上传正确格式文件');
      return noMatch;
    });

    _defineProperty(_assertThisInitialized(_this2), "beforeUpload", function (file) {
      return new Promise(function (resolve) {
        if (/(.*)\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$/.test(file.name)) {
          _this2.compressImage(file, resolve);
        } else {
          resolve(file);
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this2), "watermake", function (context) {
      for (var i = 0; i < 20; i += 1) {
        context.rotate(-15 * Math.PI / 180); // 水印初始偏转角度

        context.font = "50px 黑体";
        context.fillStyle = "rgba(100,100,100, 0.6)";

        for (var j = 0; j < 6; j += 1) {
          context.fillText("仅供蓝海数链使用", -800 + j * 420, i * 200);
        }

        context.rotate(15 * Math.PI / 180);
      }
    });

    _defineProperty(_assertThisInitialized(_this2), "compressImage", function (file, callback) {
      var _this2$props = _this2.props,
          _this2$props$getBase = _this2$props.getBase64,
          getBase64 = _this2$props$getBase === void 0 ? false : _this2$props$getBase,
          _this2$props$water = _this2$props.water,
          water = _this2$props$water === void 0 ? false : _this2$props$water;
      var reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = function (e) {
        img.src = e.target.result;
      };

      var canvas = document.createElement('canvas');
      var img = document.createElement('img');

      var that = _assertThisInitialized(_this2);

      img.src = reader.result;

      img.onload = function () {
        var context = canvas.getContext('2d'); // 图片原始尺寸

        var originWidth = this.width;
        var originHeight = this.height; // 目标尺寸

        var targetWidth = originWidth;
        var targetHeight = originHeight; // 最大尺寸限制

        var maxWidth = 1500;
        var maxHeight = 1500;

        if (originWidth > maxWidth || originHeight > maxHeight) {
          if (originWidth / originHeight > maxWidth / maxHeight) {
            // 更宽，按照宽度限定尺寸
            targetWidth = maxWidth;
            targetHeight = Math.round(maxWidth * (originHeight / originWidth));
          } else {
            targetHeight = maxHeight;
            targetWidth = Math.round(maxHeight * (originWidth / originHeight));
          }
        } // canvas对图片进行缩放


        canvas.width = targetWidth;
        canvas.height = targetHeight; // 清除画布

        context.clearRect(0, 0, targetWidth, targetHeight); // 图片压缩

        context.drawImage(img, 0, 0, targetWidth, targetHeight); // 图片水印

        water && that.watermake(context); // canvas转为blob并上传

        canvas.toBlob(function (blob) {
          blob.name = file.name;
          blob.uid = file.uid;
          getBase64 && (blob.base64 = canvas.toDataURL("image/jpeg"));
          callback(blob);
        });
      };
    });

    _this2.state = {
      fileList: props.fileList || [],
      errorUid: null
    };
    _this2.isComplete = 0;
    _this2.customRequest = _this2.customRequest.bind(_assertThisInitialized(_this2));
    _this2.changeFile = _this2.changeFile.bind(_assertThisInitialized(_this2));
    return _this2;
  }

  _createClass(Upload, [{
    key: "changeFile",
    value: function changeFile(_ref) {
      var file = _ref.file,
          fileList = _ref.fileList;

      if (this.state.errorUid) {
        this.setState({
          errorUid: null
        });
        return;
      }

      var _this$props = this.props,
          _this$props$multiple = _this$props.multiple,
          multiple = _this$props$multiple === void 0 ? false : _this$props$multiple,
          _this$props$getSingle = _this$props.getSingleFile,
          getSingleFile = _this$props$getSingle === void 0 ? false : _this$props$getSingle;

      if (file.status === 'done' || file.status === 'removed') {
        var _this$props2 = this.props,
            setFiles = _this$props2.setFiles,
            keys = _this$props2.keys;
        setFiles && multiple && !getSingleFile ? setFiles(keys, fileList, !this.isComplete) : setFiles(keys, file, !this.isComplete);
      }

      multiple ? this.setState({
        fileList: fileList
      }) : this.setState({
        fileList: [file]
      });
    }
  }, {
    key: "customRequest",
    value: function customRequest(files) {
      var fileList = this.state.fileList;
      var _this$props3 = this.props,
          token = _this$props3.token,
          _this$props3$domain = _this$props3.domain,
          domain = _this$props3$domain === void 0 ? 'https://files.dev.dtchain.io' : _this$props3$domain,
          filename = _this$props3.filename,
          start = _this$props3.start,
          _this$props3$imgSize = _this$props3.imgSize,
          imgSize = _this$props3$imgSize === void 0 ? 15 : _this$props3$imgSize,
          _this$props3$pdfSize = _this$props3.pdfSize,
          pdfSize = _this$props3$pdfSize === void 0 ? 20 : _this$props3$pdfSize,
          _this$props3$maxLengt = _this$props3.maxLength,
          maxLength = _this$props3$maxLengt === void 0 ? 100 : _this$props3$maxLengt;
      var onSuccess = files.onSuccess,
          onError = files.onError,
          onProgress = files.onProgress,
          file = files.file;

      if (this.checkFileType(file)) {
        return;
      }

      if (fileList.length === maxLength) {
        _index["default"].Message('error', "\u6587\u4EF6\u4E0A\u4F20\u6570\u91CF\u8FBE\u5230\u6700\u5927\u9650\u5236\uFF0C\u6700\u591A\u80FD\u4F20".concat(maxLength, "\u4EFD\u6587\u4EF6"));

        return;
      }

      var date = (0, _moment["default"])().format("YYYYMMDD");

      var _this = this;

      this.isComplete === 0 && start && start(true);
      this.isComplete += 1;
      var putExtra = {
        fname: file.name,
        params: {},
        mimeType: null
      };
      var config = {
        domain: domain
      };
      var size;

      if (this.isPdf(file.name)) {
        size = pdfSize;
      } else {
        size = imgSize;
      }

      if (files.file.size < size * 1024 * 1024) {
        var observable = qiniu.upload(file, "".concat(filename().key, "/").concat(date, "/").concat(filename().name).concat(_index["default"].getPostfix(file.name)), token, putExtra, config);
        var observer = {
          next: function next(res) {
            var percent = res.total.percent;
            onProgress({
              percent: percent
            });
          },
          error: function error(err) {
            onError(err);
          },
          complete: function complete(res) {
            _this.isComplete -= 1;
            onSuccess(res);
          }
        };
        observable.subscribe(observer);
      } else {
        this.setState({
          errorUid: file.uid
        });

        _index["default"].Message('error', "\u6587\u4EF6\u5927\u5C0F\u8D85\u8FC7\u9650\u5236\uFF0C\u652F\u6301\u6700\u5927".concat(this.isPdf(file.name) ? 'PDF文件' : '图片文件', "\u4F53\u79EF\u4E3A").concat(size, "M"));
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      this.props.fileList !== prevProps.fileList && this.setState({
        fileList: this.props.fileList
      });
    }
  }, {
    key: "render",
    value: function render() {
      var defaultButton = /*#__PURE__*/_react["default"].createElement(_antd.Button, {
        icon: /*#__PURE__*/_react["default"].createElement(_icons.UploadOutlined, null)
      }, "\u70B9\u51FB\u4E0A\u4F20");

      var _this$props4 = this.props,
          _this$props4$multiple = _this$props4.multiple,
          multiple = _this$props4$multiple === void 0 ? false : _this$props4$multiple,
          _this$props4$children = _this$props4.children,
          children = _this$props4$children === void 0 ? defaultButton : _this$props4$children,
          _this$props4$showBox = _this$props4.showBox,
          showBox = _this$props4$showBox === void 0 ? true : _this$props4$showBox,
          _this$props4$listType = _this$props4.listType,
          listType = _this$props4$listType === void 0 ? 'picture' : _this$props4$listType,
          _this$props4$accept = _this$props4.accept,
          accept = _this$props4$accept === void 0 ? "image/*,.pdf" : _this$props4$accept,
          _this$props4$disabled = _this$props4.disabled,
          disabled = _this$props4$disabled === void 0 ? false : _this$props4$disabled;
      var fileList = this.state.fileList;
      return [/*#__PURE__*/_react["default"].createElement(_antd.Upload, {
        accept: accept,
        key: 1,
        listType: listType,
        customRequest: this.customRequest,
        multiple: multiple,
        onChange: this.changeFile,
        fileList: fileList,
        showUploadList: showBox,
        beforeUpload: this.beforeUpload // transformFile={file => this.compressImage(file)}
        ,
        disabled: disabled
      }, children)];
    }
  }]);

  return Upload;
}(_react["default"].Component);

var _default = Upload;
exports["default"] = _default;