"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactImages = _interopRequireWildcard(require("react-images"));

var _icons = require("@ant-design/icons");

var _utils = _interopRequireDefault(require("../../utils"));

require("./style/gallery.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

var Gallery = /*#__PURE__*/function (_Component) {
  _inherits(Gallery, _Component);

  var _super = _createSuper(Gallery);

  function Gallery(props) {
    var _this;

    _classCallCheck(this, Gallery);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "isPdf", function (source) {
      if (source.indexOf("?") !== -1) {
        return /.pdf$/.test(source.split('?')[0]);
      }

      return false;
    });

    _defineProperty(_assertThisInitialized(_this), "getStyleConfig", function () {
      var _this$props$size = _this.props.size,
          size = _this$props$size === void 0 ? 'normal' : _this$props$size;

      switch (size) {
        case 'normal':
          return {
            galleryItem: 'gallery-nm-item'
          };

        case 'small':
          return {
            galleryItem: 'gallery-sm-item'
          };

        default:
          break;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "toggleVisible", function (e, i, visible) {
      e.stopPropagation();

      _this.props.handleVisibleChange(i, visible);
    });

    _defineProperty(_assertThisInitialized(_this), "renderVisibleEye", function (obj, i) {
      return obj.visible ? /*#__PURE__*/_react["default"].createElement(_icons.EyeOutlined, {
        className: "gallery-item-eye",
        onClick: function onClick(e) {
          return _this.toggleVisible(e, i, obj.visible);
        }
      }) : /*#__PURE__*/_react["default"].createElement(_icons.EyeInvisibleOutlined, {
        className: "gallery-item-eye",
        type: "eye-invisible",
        onClick: function onClick(e) {
          return _this.toggleVisible(e, i, obj.visible);
        }
      });
    });

    _this.state = {
      lightboxIsOpen: false,
      currentImage: 0
    };
    _this.openLightbox = _this.openLightbox.bind(_assertThisInitialized(_this));
    _this.closeLightbox = _this.closeLightbox.bind(_assertThisInitialized(_this));
    _this.gotoPrevious = _this.gotoPrevious.bind(_assertThisInitialized(_this));
    _this.gotoNext = _this.gotoNext.bind(_assertThisInitialized(_this));
    _this.gotoImage = _this.gotoImage.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Gallery, [{
    key: "openLightbox",
    value: function openLightbox(index, e) {
      var images = this.props.images;
      e.preventDefault(); //1. 判断当前图片索引之前有多少份pdf文件,n
      //2. currentimage = index - n

      var newArr = images.slice(0, index + 1);
      var pdfArr = newArr.filter(function (item) {
        return /.pdf$/.test(item.source.split('?')[0]);
      });
      this.setState({
        currentImage: index - pdfArr.length,
        lightboxIsOpen: true
      });
    }
  }, {
    key: "closeLightbox",
    value: function closeLightbox() {
      this.setState({
        currentImage: 0,
        lightboxIsOpen: false
      });
    }
  }, {
    key: "gotoPrevious",
    value: function gotoPrevious() {
      this.setState({
        currentImage: this.state.currentImage - 1
      });
    }
  }, {
    key: "gotoNext",
    value: function gotoNext() {
      this.setState({
        currentImage: this.state.currentImage + 1
      });
    }
  }, {
    key: "gotoImage",
    value: function gotoImage(index) {
      this.setState({
        currentImage: index
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var lightboxIsOpen = this.state.lightboxIsOpen;
      var _this$props = this.props,
          images = _this$props.images,
          deletable = _this$props.deletable,
          deleteCallback = _this$props.deleteCallback,
          visible = _this$props.visible;
      var styles = this.getStyleConfig();
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "gallery"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "gallery-list"
      }, images.map(function (obj, i) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          key: i,
          className: styles.galleryItem
        }, !_this2.isPdf(obj.source) ? /*#__PURE__*/_react["default"].createElement("div", {
          className: "gallery-item-box",
          onClick: function onClick(e) {
            return _this2.openLightbox(i, e);
          }
        }, /*#__PURE__*/_react["default"].createElement("a", {
          href: obj.source
        }, /*#__PURE__*/_react["default"].createElement("img", {
          src: obj.source,
          alt: i
        })), visible && _this2.renderVisibleEye(obj, i)) : /*#__PURE__*/_react["default"].createElement("div", {
          className: "gallery-item-box",
          onClick: function onClick() {
            return /^http/.test(obj.source) ? window.open(obj.source) : _utils["default"].Message('warning', '预览出错');
          }
        }, /*#__PURE__*/_react["default"].createElement("span", {
          className: "link"
        }, obj.loading ? /*#__PURE__*/_react["default"].createElement(_icons.LoadingOutlined, null) : /*#__PURE__*/_react["default"].createElement(_icons.FilePdfOutlined, {
          theme: "twoTone",
          style: {
            fontSize: '40px'
          }
        })), visible && _this2.renderVisibleEye(obj, i)), /*#__PURE__*/_react["default"].createElement("div", {
          className: "gallery-text"
        }, obj.text), deletable && /*#__PURE__*/_react["default"].createElement(_icons.CloseOutlined, {
          className: "gallery-item-delete",
          onClick: function onClick(e) {
            return deleteCallback(e, i);
          }
        }));
      })), /*#__PURE__*/_react["default"].createElement(_reactImages.ModalGateway, null, lightboxIsOpen ? /*#__PURE__*/_react["default"].createElement(_reactImages.Modal, {
        onClose: this.closeLightbox
      }, /*#__PURE__*/_react["default"].createElement(_reactImages["default"], {
        key: -1,
        currentIndex: this.state.currentImage,
        views: images.filter(function (item) {
          return !_this2.isPdf(item.source);
        }),
        onClickNext: this.gotoNext,
        onClickPrev: this.gotoPrevious
      })) : null));
    }
  }]);

  return Gallery;
}(_react.Component);

exports["default"] = Gallery;