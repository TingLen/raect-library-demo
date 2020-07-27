import React, {useState, useEffect} from 'react'
import {Menu, Badge} from 'antd'
import {useLocation, useHistory} from 'react-router-dom'
const SideBar = ({menuData, permissionCode=[]}) => {

  const location = useLocation()
  const history = useHistory()
  const [openKeys, setOpenKeys] = useState([])
  const [rootKeys, setRootKeys] = useState([])
  const [allKeys, setAllKeys] = useState([])
  const [selectedKeys, setSelectedKeys] = useState([])

  useEffect(() => {
    let arr = []
    const _allKeys = []
    const handleMenuKeys = (data, rootArr, allArr) => {
      data.forEach(item => {
        if(item['children']) {
          rootArr.push(item['path'])
          handleMenuKeys(item['children'], rootArr, allArr)
        }
        allArr.push(item['path'])
      })
    }
    handleMenuKeys(menuData, arr, _allKeys)
    setRootKeys(arr) // submenu key
    setAllKeys(_allKeys) //所有 menu 的 key
  }, [menuData])

  useEffect(() => {
    // 将'/asset/url' 变为 ['/asset', '/asset/url'] 的数组
    const urlToList = url => {
      const urlArr = url.split('/')
      return urlArr.map((_, index) => urlArr.slice(0, index + 1).join('/'))
    }

    // 根据url, 匹配allKeys中的menuItem
    const mathAllKeys = (_allKeys, urlList) => {
      return urlList.filter(url => _allKeys.indexOf(url) !== -1)
    }
    setSelectedKeys(mathAllKeys(allKeys, urlToList(location.pathname)))
  }, [allKeys, location.pathname])

  // 同样url下点击左导不做刷新
  const handleClick = ({key}) => {
    key !== location.pathname && history.push(key)
  }

  const handleMenuData = (menuDataItem={}) => {
    if(menuDataItem['children']) {
      return (
        <Menu.SubMenu key={menuDataItem['path']} icon={menuDataItem['icon']} title={menuDataItem['name']}>
          {renderMenuItem(menuDataItem['children'])}
        </Menu.SubMenu>
      )
    }
    return (
      <Menu.Item key={menuDataItem['path']} icon={menuDataItem['icon']}>
        <Badge dot={menuDataItem['dot']}>
          {menuDataItem['name']}
        </Badge>
      </Menu.Item>
    )
  }

  const renderMenuItem = (_menuData = []) => {
    return (
      _menuData.map(menuDataItem => handleMenuData(menuDataItem))
    )
  }

  const handleOpen = keys => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1) // 当前应展开的SubMenu的key
    if (rootKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys)
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
  }

  const withPermission = (_menuData, code) => {
    //去重
    const menuItemCode = [...new Set(code)]
    const handleMenuItem = target => {
      const result = target.filter(item => {
        /**
         * 1. 无子集，无code
         * 2. 有子集，无code
         * 3. 有子集，有code
         * 4. 无子集，有code
         */
        if(!item['children']) {
          if(item['code']) {
            return menuItemCode.includes(item['code']) // 无子集，有code，则检测是否有对应的permissions code
          } else {
            return true // 无子集，无code，直接返回
          }
        } else {
          if(item['code']) {
            if(menuItemCode.includes(item['code'])) {
              item['children'] = handleMenuItem(item['children']) // 有子集，有code，先检测是否有对应的permission code , 没有则直接返回false, 有的话则递归检测
              return item['children'].length !== 0
            } else {
              return false
            }
          } else {
            item['children'] = handleMenuItem(item['children']) // 有子集，无code，直接递归检测其子集
            return item['children'].length !== 0
          }
        }
      })

      return result
    }
    const arr = handleMenuItem(_menuData)
    return arr
  }

  return (
    <Menu
      style={{paddingLeft: '8px'}}
      mode="inline"
      openKeys={openKeys}
      selectedKeys={selectedKeys}
      onOpenChange={handleOpen}
      onClick={handleClick}
    >
      {renderMenuItem(withPermission(menuData, permissionCode))}
    </Menu>
  )
}

export default SideBar