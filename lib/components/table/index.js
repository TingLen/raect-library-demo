"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TableComponent = void 0;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

var _propTypes = _interopRequireDefault(require("prop-types"));

require("./style/index.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var TableComponent = function TableComponent(_ref) {
  var _ref$rowSelection = _ref.rowSelection,
      rowSelection = _ref$rowSelection === void 0 ? null : _ref$rowSelection,
      columns = _ref.columns,
      loading = _ref.loading,
      data = _ref.data,
      pageInfo = _ref.pageInfo,
      _rowKey = _ref.rowKey,
      onTableChange = _ref.onTableChange,
      onPaginationChange = _ref.onPaginationChange,
      children = _ref.children,
      size = _ref.size,
      scroll = _ref.scroll,
      footer = _ref.footer,
      style = _ref.style,
      _ref$pagination = _ref.pagination,
      pagination = _ref$pagination === void 0 ? false : _ref$pagination,
      showHeader = _ref.showHeader,
      _ref$bordered = _ref.bordered,
      bordered = _ref$bordered === void 0 ? false : _ref$bordered,
      _ref$hasShadow = _ref.hasShadow,
      hasShadow = _ref$hasShadow === void 0 ? true : _ref$hasShadow,
      className = _ref.className,
      expandedRowRender = _ref.expandedRowRender;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "".concat(className, " clearfix"),
    style: style
  }, /*#__PURE__*/_react["default"].createElement(_antd.Table, {
    columns: columns,
    dataSource: data,
    rowKey: function rowKey(record, index) {
      return record["".concat(_rowKey)] || index + 1;
    },
    pagination: pagination,
    loading: loading,
    onChange: onTableChange,
    rowSelection: rowSelection,
    bordered: bordered,
    size: size,
    showHeader: showHeader,
    scroll: scroll,
    footer: footer,
    expandedRowRender: expandedRowRender,
    className: hasShadow ? "table-container-shadow" : "table-container"
  }), children, pageInfo && pageInfo.total_records && !pagination ? /*#__PURE__*/_react["default"].createElement(_antd.Pagination, {
    showQuickJumper: true,
    defaultCurrent: 1,
    current: pageInfo.current_page,
    total: pageInfo.total_records,
    onChange: onPaginationChange,
    pageSize: pageInfo.page_size,
    showSizeChanger: false,
    showTotal: function showTotal(total, range) {
      return range[0] > 0 && "\u7B2C ".concat(range[0], " \u6761\u5230\u7B2C ").concat(range[1], " \u6761\uFF0C\u5171 ").concat(total, " \u6761");
    },
    style: {
      "float": 'right',
      marginTop: '20px',
      marginRight: '20px'
    },
    size: size
  }) : null);
};

exports.TableComponent = TableComponent;
TableComponent.propTypes = {
  columns: _propTypes["default"].array.isRequired,
  loading: _propTypes["default"].bool.isRequired,
  data: _propTypes["default"].array.isRequired,
  allData: _propTypes["default"].object,
  onTableChange: _propTypes["default"].func,
  onPaginationChange: _propTypes["default"].func
};