"use client"
import { createContext, useEffect, useState } from "react"
import { getDocument } from "../utils/firebase.utils";


export const ProductsContext = createContext({
  categories: [],
  products: [],
  selectedCategory: "",
  setSelectedCategory: () => {},
  updateProduct: () => {},
});

export const ProductsProvider = ({children}) => {
  const [categories, setCategories] = useState(
    [
      {'value': 'hats', 'label': 'hats'},
      {'value': 'jackets', 'label': 'jackets'},
      {'value': 'sneakers', 'label': 'sneakers'},
      {'value': 'womens', 'label': 'womens'},
      {'value': 'mens', 'label': 'mens'},
    ]
  );
  const [products, setProducts] = useState();
  const [selectedCategory, setSelectedCategory] = useState();


  useEffect(() => {
    const loadDoc = async () => {
      const docObject = await getDocument("categories", selectedCategory ? selectedCategory : "hats");
      setProducts(docObject.items)
    }
    loadDoc();
    console.log(selectedCategory)
  }, [selectedCategory])


  // ERROR:
  // adds the same element in the Array again,
  // and keeps it even through Category change
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
  const value = {
    categories,
    products, 
    updateProduct,
    selectedCategory,
    setSelectedCategory,
  };
 
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  )
}
