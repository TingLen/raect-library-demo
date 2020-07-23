"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _antd = require("antd");

var _dtchain_provider = _interopRequireDefault(require("../../utils/dtchain_provider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var DTchainContext = _dtchain_provider["default"].DTchainContext;

function itemRender(route, params, routes) {
  var last = routes.indexOf(route) === routes.length - 1;
  return last ? /*#__PURE__*/_react["default"].createElement("span", null, route.breadcrumbName) : /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Link, {
    to: route.path
  }, route.breadcrumbName);
}

var PageContent = function PageContent(_ref) {
  var title = _ref.title,
      extra = _ref.extra,
      headerContent = _ref.headerContent,
      children = _ref.children,
      className = _ref.className;

  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      routes = _useState2[0],
      setRoutes = _useState2[1];

  var routeMatch = (0, _reactRouterDom.useRouteMatch)();

  var _useContext = (0, _react.useContext)(DTchainContext),
      _useContext$breadcrum = _useContext.breadcrumbNameMap,
      breadcrumbNameMap = _useContext$breadcrum === void 0 ? {} : _useContext$breadcrum;

  (0, _react.useEffect)(function () {
    var routesArr = [];
    var pathSnippets = routeMatch.path.split('/').filter(function (i) {
      return i;
    });
    pathSnippets.forEach(function (_, index) {
      var url = "/".concat(pathSnippets.slice(0, index + 1).join('/')); // 用于匹配breadcrumbNameMap

      var _url = "/".concat(pathSnippets.slice(0, index + 1).join('/')); // 用于执行替换操作


      if (breadcrumbNameMap[url]) {
        /**
         * 1. 匹配动态路由参数
         * 2. 将动态路由参数替换为routeMatch.params[param]
         */
        var paramsReg = /:[A-Za-z]+/g;
        var paramRegResult;

        while ((paramRegResult = paramsReg.exec(_url)) !== null) {
          var param = paramRegResult[0].substring(1);
          _url = _url.replace(paramRegResult[0], routeMatch.params[param]);
        }

        routesArr.push({
          path: _url,
          breadcrumbName: breadcrumbNameMap[url]
        });
      }
    });
    setRoutes(routesArr); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return /*#__PURE__*/_react["default"].createElement(_react.Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      backgroundColor: '#ffffff'
    }
  }, /*#__PURE__*/_react["default"].createElement(_antd.PageHeader, {
    title: title,
    extra: extra,
    breadcrumb: {
      routes: routes.length > 1 ? routes : [],
      itemRender: itemRender
    }
  }, headerContent)), /*#__PURE__*/_react["default"].createElement("div", {
    className: className,
    style: {
      margin: '24px'
    }
  }, children));
};

var _default = PageContent;
exports["default"] = _default;