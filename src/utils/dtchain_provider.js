import React from 'react'

const DTchainContext = React.createContext()

const DTchainProvider = ({value, ...props}) => {

  return (
    <DTchainContext.Provider value={value}>
      {props.children}
    </DTchainContext.Provider>
  )
}

DTchainProvider.DTchainContext = DTchainContext

export default DTchainProvider