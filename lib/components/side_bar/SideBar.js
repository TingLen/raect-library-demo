"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

var _reactRouterDom = require("react-router-dom");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var SideBar = function SideBar(_ref) {
  var menuData = _ref.menuData,
      _ref$permissionCode = _ref.permissionCode,
      permissionCode = _ref$permissionCode === void 0 ? [] : _ref$permissionCode;
  var location = (0, _reactRouterDom.useLocation)();
  var history = (0, _reactRouterDom.useHistory)();

  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      openKeys = _useState2[0],
      setOpenKeys = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = _slicedToArray(_useState3, 2),
      rootKeys = _useState4[0],
      setRootKeys = _useState4[1];

  var _useState5 = (0, _react.useState)([]),
      _useState6 = _slicedToArray(_useState5, 2),
      allKeys = _useState6[0],
      setAllKeys = _useState6[1];

  var _useState7 = (0, _react.useState)([]),
      _useState8 = _slicedToArray(_useState7, 2),
      selectedKeys = _useState8[0],
      setSelectedKeys = _useState8[1];

  (0, _react.useEffect)(function () {
    var arr = [];
    var _allKeys = [];

    var handleMenuKeys = function handleMenuKeys(data, rootArr, allArr) {
      data.forEach(function (item) {
        if (item['children']) {
          rootArr.push(item['path']);
          handleMenuKeys(item['children'], rootArr, allArr);
        }

        allArr.push(item['path']);
      });
    };

    handleMenuKeys(menuData, arr, _allKeys);
    setRootKeys(arr); // submenu key

    setAllKeys(_allKeys); //所有 menu 的 key
  }, [menuData]);
  (0, _react.useEffect)(function () {
    // 将'/asset/url' 变为 ['/asset', '/asset/url'] 的数组
    var urlToList = function urlToList(url) {
      var urlArr = url.split('/');
      return urlArr.map(function (_, index) {
        return urlArr.slice(0, index + 1).join('/');
      });
    }; // 根据url, 匹配allKeys中的menuItem


    var mathAllKeys = function mathAllKeys(_allKeys, urlList) {
      return urlList.filter(function (url) {
        return _allKeys.indexOf(url) !== -1;
      });
    };

    setSelectedKeys(mathAllKeys(allKeys, urlToList(location.pathname)));
  }, [allKeys, location.pathname]); // 同样url下点击左导不做刷新

  var handleClick = function handleClick(_ref2) {
    var key = _ref2.key;
    key !== location.pathname && history.push(key);
  };

  var handleMenuData = function handleMenuData() {
    var menuDataItem = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (menuDataItem['children']) {
      return /*#__PURE__*/_react["default"].createElement(_antd.Menu.SubMenu, {
        key: menuDataItem['path'],
        icon: menuDataItem['icon'],
        title: menuDataItem['name']
      }, renderMenuItem(menuDataItem['children']));
    }

    return /*#__PURE__*/_react["default"].createElement(_antd.Menu.Item, {
      key: menuDataItem['path'],
      icon: menuDataItem['icon']
    }, /*#__PURE__*/_react["default"].createElement(_antd.Badge, {
      dot: menuDataItem['dot']
    }, menuDataItem['name']));
  };

  var renderMenuItem = function renderMenuItem() {
    var _menuData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    return _menuData.map(function (menuDataItem) {
      return handleMenuData(menuDataItem);
    });
  };

  var handleOpen = function handleOpen(keys) {
    var latestOpenKey = keys.find(function (key) {
      return openKeys.indexOf(key) === -1;
    }); // 当前应展开的SubMenu的key

    if (rootKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  var withPermission = function withPermission(_menuData, code) {
    //去重
    var menuItemCode = _toConsumableArray(new Set(code));

    var handleMenuItem = function handleMenuItem(target) {
      var result = target.filter(function (item) {
        /**
         * 1. 无子集，无code
         * 2. 有子集，无code
         * 3. 有子集，有code
         * 4. 无子集，有code
         */
        if (!item['children']) {
          if (item['code']) {
            return menuItemCode.includes(item['code']); // 无子集，有code，则检测是否有对应的permissions code
          } else {
              return true; // 无子集，无code，直接返回
            }
        } else {
          if (item['code']) {
            if (menuItemCode.includes(item['code'])) {
              item['children'] = handleMenuItem(item['children']); // 有子集，有code，先检测是否有对应的permission code , 没有则直接返回false, 有的话则递归检测

              return item['children'].length !== 0;
            } else {
              return false;
            }
          } else {
            item['children'] = handleMenuItem(item['children']); // 有子集，无code，直接递归检测其子集

            return item['children'].length !== 0;
          }
        }
      });
      return result;
    };

    var arr = handleMenuItem(_menuData);
    return arr;
  };

  return /*#__PURE__*/_react["default"].createElement(_antd.Menu, {
    style: {
      paddingLeft: '8px'
    },
    mode: "inline",
    openKeys: openKeys,
    selectedKeys: selectedKeys,
    onOpenChange: handleOpen,
    onClick: handleClick
  }, renderMenuItem(withPermission(menuData, permissionCode)));
};

var _default = SideBar;
exports["default"] = _default;