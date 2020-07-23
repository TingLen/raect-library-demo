import React from 'react'
import {Pagination, Table} from 'antd'
import PropTypes from 'prop-types'
import './style/index.less'

export const TableComponent = ({
  rowSelection=null, columns, loading, data, pageInfo, rowKey,
  onTableChange, onPaginationChange, children, size, scroll, footer,
  style, pagination = false, showHeader, bordered = false, hasShadow=true, className, expandedRowRender
}) => (
  <div className={`${className} clearfix`} style={style}>
    <Table
      columns={columns}
      dataSource={data}
      rowKey={(record, index) => record[`${rowKey}`] || (index + 1)}
      pagination={pagination}
      loading={loading}
      onChange={onTableChange}
      rowSelection={rowSelection}
      bordered={bordered}
      size={size}
      showHeader={showHeader}
      scroll={scroll}
      footer={footer}
      expandedRowRender={expandedRowRender}
      className={hasShadow ? `table-container-shadow` : `table-container`}
    />
    {children}
    {(pageInfo && pageInfo.total_records && !pagination) ? <Pagination
      showQuickJumper
      defaultCurrent={1}
      current={pageInfo.current_page}
      total={pageInfo.total_records}
      onChange={onPaginationChange}
      pageSize={pageInfo.page_size}
      showSizeChanger={false}
      showTotal={(total, range) => range[0] > 0 && `第 ${range[0]} 条到第 ${range[1]} 条，共 ${total} 条`}
      style={{float: 'right', marginTop: '20px', marginRight: '20px'}}
      size={size}
    /> : null
    }
  </div>
)
TableComponent.propTypes = {
  columns: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired,
  allData: PropTypes.object,
  onTableChange: PropTypes.func,
  onPaginationChange: PropTypes.func
}
