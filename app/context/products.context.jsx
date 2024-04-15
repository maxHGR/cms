"use client"
import { createContext, useEffect, useState } from "react"
import { getDocument, updateDocument } from "../utils/firebase.utils";


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

  useEffect(() => {
    const loadDoc = async () => {
      const docObject = await getDocument("categories", selectedCategory ? selectedCategory : "hats");
      setProducts(docObject.items)
    }
    loadDoc();
    console.log(selectedCategory)
  }, [selectedCategory])

/*
  const updateProduct = (item) => {
    const productsArray = [...products];
    const index = item.id - 1;
    productsArray.splice(index, 1, item);
    setProducts(productsArray);
    console.log(productsArray);
    console.log(item)
  }
*/
  const updateProduct = (updatedProduct) => {
    // prevProducts = current state [products Array]
      setProducts((prevProducts) => {
      console.log(prevProducts);
      const productIndex = prevProducts.findIndex((product) => product.id === updatedProduct.id);

      if (productIndex === -1) {
        // Product not found, handle error
        return prevProducts;
      }

      // Replace the product at productIndex with updatedProduct
      const newProducts = [...prevProducts];
      newProducts[productIndex] = updatedProduct;
      console.log(newProducts)
      console.log(products)
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
