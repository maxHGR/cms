"use client"
import { createContext, useEffect, useState } from "react"
import { getCategories, getDocument, updateDocument } from "../utils/firebase.utils";


export const ProductsContext = createContext({
  categories: [],
  products: [],
  selectedCategory: "",
  setSelectedCategory: () => {},
  updateProduct: () => {},
});


export const ProductsProvider = ({children}) => {
  const [products, setProducts] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [categories, setCategories] = useState(
    [
      {'value': 'hats', 'label': 'hats'},
      {'value': 'jackets', 'label': 'jackets'},
      {'value': 'sneakers', 'label': 'sneakers'},
      {'value': 'womens', 'label': 'womens'},
      {'value': 'mens', 'label': 'mens'},
    ]
  );

  // pull categories from firebase db
  useEffect(() => {
    const loadColl = async () => {
      const categoriesObject = await getCategories();
      setCategories(categoriesObject);
    }
    // ERROR
    // doesnt update the categories Array right, or some other problem
    // loadColl();
    console.log(categories)
  }, [])

  useEffect(() => {
    const loadDoc = async () => {
      const docObject = await getDocument("categories", selectedCategory ? selectedCategory : "hats");
      setProducts(docObject.items)
    }
    loadDoc();
  }, [selectedCategory])

  
  const updateProduct = (updatedProduct) => {
    // prevProducts === current state [products Array]
      setProducts((prevProducts) => {
      const productIndex = prevProducts.findIndex((product) => product.id === updatedProduct.id);

      if (productIndex === -1) {
        // Product not found, handle error
        return prevProducts;
      }

      // Replace the product at productIndex with updatedProduct
      const newProducts = [...prevProducts];
      newProducts[productIndex] = updatedProduct;
      return newProducts;
    });
    
    updateDocument("categories", selectedCategory, products)
  };
  
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
