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
  const [selectedCategory, setSelectedCategory] = useState("hats");
  const [categories, setCategories] = useState();

  useEffect(() => {
    const loadColl = async () => {
      const categoriesObject = await getCategories();
      setCategories(categoriesObject);
    }
    loadColl();
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
    if(updatedProduct.id !== "newID") {
      setProducts((prevProducts) => {
        const productIndex = prevProducts.findIndex((product) => product.id === updatedProduct.id);
  
        if (productIndex === -1) {
          alert("product not found")
          return prevProducts;
        }
    
      const newProducts = [...prevProducts];
      newProducts[productIndex] = updatedProduct;
      return newProducts;
    });
    }

    if(updatedProduct.id === "newID") {
      alert(updatedProduct.id)
      updatedProduct.id = `${selectedCategory[0]}${products.length + 1}`;
      setProducts((prevProducts) => {
        const newProducts = [...prevProducts];
        newProducts.push(updatedProduct);
        return newProducts;
      })
    }

    updateDocument("categories", selectedCategory, products)
  };

  const deleteProduct = (idToDelete) => {
    setProducts((prevProducts) => {
      const newProducts = prevProducts.filter(product => product.id !== idToDelete);
      updateDocument("categories", selectedCategory, newProducts);
      return newProducts;
    });
  }
  
  const value = {
    categories,
    products, 
    updateProduct,
    deleteProduct,
    selectedCategory,
    setSelectedCategory,
  };
 
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  )
}
