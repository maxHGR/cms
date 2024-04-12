"use client"
import { createContext, useEffect, useState } from "react"
import { getDocument } from "../utils/firebase.utils";


export const ProductsContext = createContext({
  products: [],
  updateProduct: () => {},
});

export const ProductsProvider = ({children}) => {
  const [products, setProducts] = useState();
  
  useEffect(() => {
    const loadDoc = async () => {
      const docObject = await getDocument("categories", "hats");
      setProducts(docObject.items)
    }
    loadDoc()
  }, [])
  
  const updateProduct = (item) => {
    const productsArray = [...products];
    const index = item.id - 1;
    productsArray.splice(index, 1, item);
    setProducts(productsArray);
    console.log(productsArray);
    console.log(item)
  }
  
  /*
  every Product Card gets a function 
  where it can update the PRODUCT OBJECT
  the function utilizes the "updateDocument" Function
  from Firebase, and it accesses the demanded Document 
  through bracket notation
  */
  const value = {products, updateProduct};
 
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  )
}
