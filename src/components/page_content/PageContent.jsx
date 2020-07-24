import React, {Fragment, useState, useEffect, useContext} from 'react'
import {Link, useRouteMatch} from 'react-router-dom'
import {PageHeader as APageHeader} from 'antd'
import DTchainProvider from '../_utils/dtchain_provider'

const {DTchainContext} = DTchainProvider

function itemRender(route, params, routes) {
  const last = routes.indexOf(route) === routes.length - 1
  return last ? (
    <span>{route.breadcrumbName}</span>
  ) : (
    <Link to={route.path}>{route.breadcrumbName}</Link>
  )
}

const PageContent = ({title, extra, headerContent, children, className}) => {
  const [routes, setRoutes] = useState([])
  const routeMatch = useRouteMatch()
  const {breadcrumbNameMap = {}} = useContext(DTchainContext)

  useEffect(() => {
    const routesArr = []
    const pathSnippets = routeMatch.path.split('/').filter(i => i)
    pathSnippets.forEach((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}` // 用于匹配breadcrumbNameMap
      let _url = `/${pathSnippets.slice(0, index + 1).join('/')}` // 用于执行替换操作
      if(breadcrumbNameMap[url]) {
        /**
         * 1. 匹配动态路由参数
         * 2. 将动态路由参数替换为routeMatch.params[param]
         */
        const paramsReg = /:[A-Za-z]+/g
        let paramRegResult
        while ((paramRegResult = paramsReg.exec(_url)) !== null) {
          const param = paramRegResult[0].substring(1)
          _url = _url.replace(paramRegResult[0], routeMatch.params[param])
        }
        routesArr.push({
          path: _url,
          breadcrumbName: breadcrumbNameMap[url]
        })
      }
      
    })
    setRoutes(routesArr)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
    <Fragment>
      <div style={{backgroundColor: '#ffffff'}}>
        <APageHeader
          title={title}
          extra={extra}
          breadcrumb={{
            routes: routes.length > 1 ? routes : [], 
            itemRender
          }}
        >
          {headerContent}
        </APageHeader>
      </div>
      <div className={className} style={{margin: '24px'}}>{children}</div>
    </Fragment>
  )
}

export default PageContent