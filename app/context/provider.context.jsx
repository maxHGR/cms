"use client"

import React from 'react'
import { ProductsProvider } from './products.context'

export const ContextProvider = ({children}) => {
  return (
    <ProductsProvider>{children}</ProductsProvider>
  )
}

export default ContextProvider