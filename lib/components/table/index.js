"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var lodash = _interopRequireWildcard(require("lodash"));

var _TableComponent = require("./TableComponent");

var _hooks = _interopRequireDefault(require("../../utils/hooks"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var reducer = function reducer(state, action) {
  var params = action.searchData;
  action.extraParams && Object.assign(params, action.extraParams);

  switch (action.type) {
    case 'ON_PAGE_CHANGE':
      action.getData(action.page, params, true);
      return _objectSpread(_objectSpread({}, state), {}, {
        page: action.page
      });

    case 'ON_SEARCH_DATA_CHANGE':
      action.getData(1, action.searchData, false);
      return {
        searchData: action.searchData,
        page: 1
      };

    default:
      return state;
  }
};

var Table = function Table(_ref) {
  var columns = _ref.columns,
      data = _ref.data,
      loading = _ref.loading,
      pageInfo = _ref.pageInfo,
      actions = _ref.actions,
      extraParams = _ref.extraParams,
      props = _objectWithoutProperties(_ref, ["columns", "data", "loading", "pageInfo", "actions", "extraParams"]);

  var location = (0, _reactRouterDom.useLocation)();
  var history = (0, _reactRouterDom.useHistory)();

  var isMount = _hooks["default"].useMount();

  var _useReducer = (0, _react.useReducer)(reducer, lodash.get(location, 'state', {
    searchData: {},
    page: 1
  })),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  (0, _react.useEffect)(function () {
    var searchData = _objectSpread({}, lodash.get(location, 'state.searchData', {}));

    extraParams && Object.assign(searchData, extraParams);
    getData(lodash.get(location, 'state.page', 1), searchData, !!location.state);
    !lodash.get(location, 'state.page') && history.replace(location.pathname, _objectSpread(_objectSpread({}, location.state), {}, {
      page: 1
    })); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  (0, _react.useEffect)(function () {
    if (!isMount) {
      dispatch({
        type: 'ON_SEARCH_DATA_CHANGE',
        searchData: lodash.get(location, 'state.searchData', {}),
        getData: getData,
        extraParams: extraParams
      });
      history.replace(location.pathname, _objectSpread(_objectSpread({}, location.state), {}, {
        page: 1
      }));
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [lodash.get(location, 'state.searchData')]);

  var getData = function getData(page, searchData, loadType) {
    var obj = {};
    Object.keys(searchData).forEach(function (key) {
      !lodash.isNil(searchData[key]) && (obj[key] = searchData[key]);
    });

    if (!location.state || !data.data[page] || !loadType) {
      actions({
        page: page,
        searchData: _objectSpread({}, obj),
        loadType: loadType
      });
    }
  };

  var onPageChange = function onPageChange(page) {
    dispatch({
      type: 'ON_PAGE_CHANGE',
      searchData: lodash.get(location, 'state.searchData', {}),
      page: page,
      getData: getData,
      extraParams: extraParams
    });
    history.replace(location.pathname, _objectSpread(_objectSpread({}, location.state), {}, {
      page: page
    }));
  };

  return /*#__PURE__*/_react["default"].createElement(_TableComponent.TableComponent, _extends({
    columns: columns,
    data: data.data[state.page] || [],
    loading: loading,
    pageInfo: _objectSpread({
      current_page: state.page
    }, pageInfo),
    onPaginationChange: onPageChange
  }, props));
};

var _default = Table;
exports["default"] = _default;