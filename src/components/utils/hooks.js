import { useState, useEffect, useRef } from 'react'
import { useHistory, useLocation } from "react-router-dom"
import lodash from 'lodash'

export const usePrevious = value => {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

export const useMount = () => {
  const isMount = useRef(true)
  useEffect(() => {
    isMount.current = false
  }, [])
  return isMount.current
}

export const useSearchData = initData => {
  const location = useLocation()
  const history = useHistory()

  const [searchData, setSearchData] = useState(lodash.get(location, 'state.searchData', initData))

  const cacheSearchData = resetData => {
    const obj = resetData ? 
      {searchData: {...resetData}} : 
        {searchData: {...searchData}}
    history.replace(location.pathname, {...location.state, ...obj})
  }

  const initSearchData = initData => setSearchData(lodash.get(location, 'state.searchData', initData))

  const changeSearchData = data => {
    setSearchData({...searchData, ...data})
  }

  const resetSearchData = resetData => {
    setSearchData(resetData)
    cacheSearchData(resetData)
  }

  return [
    searchData,
    cacheSearchData,
    initSearchData,
    changeSearchData,
    resetSearchData
  ]
}

export default {
  usePrevious,
  useMount,
  useSearchData
}