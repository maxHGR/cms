"use client"
import { createContext, useEffect, useState } from "react"
import { getDocument } from "../utils/firebase.utils";


export const ProductsContext = createContext({
  products: [],
});

export const ProductsProvider = ({children}) => {
  const [products, setProducts] = useState();
  const value = {products};

  useEffect(() => {
      const loadDoc = async () => {
      const docObject = await getDocument("categories", "hats");
      setProducts(docObject.items)
      console.log("context")
      console.log(docObject.items)
      }
    loadDoc()
  }, [])


/*
    every Product Card gets a function 
    where it can update the PRODUCT OBJECT
    the function utilizes the "updateDocument" Function
    from Firebase, and it accesses the demanded Document 
    through bracket notation

    products[item] = 

    ?
*/

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  )
}
