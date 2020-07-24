import React, {useEffect, useReducer} from 'react'
import { useHistory, useLocation } from "react-router-dom"
import * as lodash from 'lodash'
import {TableComponent} from './TableComponent'
import hooks from '../_utils/hooks'

const reducer = (state, action) => {
  const params = action.searchData
  action.extraParams && Object.assign(params, action.extraParams)
  switch (action.type) {
    case 'ON_PAGE_CHANGE':
      action.getData(action.page, params, true)
      return {...state, page: action.page}
    case 'ON_SEARCH_DATA_CHANGE':
      action.getData(1, action.searchData, false)
      return {searchData: action.searchData, page: 1}
    default:
      return state
  }
}

const Table = ({columns, data, loading, pageInfo, actions, extraParams, ...props}) => {
  const location = useLocation()
  const history = useHistory()
  const isMount = hooks.useMount()
  const [state, dispatch] = useReducer(reducer, lodash.get(location, 'state', {searchData: {}, page: 1}))

  useEffect(() => {
    const searchData = {...lodash.get(location, 'state.searchData', {})}
    extraParams && Object.assign(searchData, extraParams)
    getData(lodash.get(location, 'state.page', 1), searchData, !!location.state)
    !lodash.get(location, 'state.page') && history.replace(location.pathname, {...location.state, page: 1})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  

  useEffect(() => { 
    if(!isMount) {
      dispatch({
        type: 'ON_SEARCH_DATA_CHANGE',
        searchData: lodash.get(location, 'state.searchData', {}),
        getData,
        extraParams
      })
      history.replace(location.pathname, {...location.state, page: 1})
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lodash.get(location, 'state.searchData')])


  const getData = (page, searchData, loadType) => {
    
    const obj = {}
    Object
    .keys(searchData)
    .forEach(key => {
      !lodash.isNil(searchData[key]) && (obj[key] = searchData[key])
    })
    if(!location.state || !data.data[page] || !loadType) {
      actions({page, searchData: {...obj}, loadType})
    }
  }

  const onPageChange = page => {
    dispatch({
      type: 'ON_PAGE_CHANGE',
      searchData: lodash.get(location, 'state.searchData', {}),
      page: page,
      getData,
      extraParams
    })
    history.replace(location.pathname, {...location.state, page: page})
  }

  return (
    <TableComponent
    columns={columns}
    data={data.data[state.page] || []}
    loading={loading}
    pageInfo={{
      current_page: state.page,
      ...pageInfo
    }}
    onPaginationChange={onPageChange}
    {...props}
    />
  )
}

export default Table