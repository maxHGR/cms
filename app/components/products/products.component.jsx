import { useContext, useEffect, useState } from "react"
import Select from "react-select"

import { ProductsContext } from "@/app/context/products.context"
import ProductCard from "../product-card/product-card.component"


const Products = () => {
  const { 
    products, 
    categories, 
    setSelectedCategory 
  } = useContext(ProductsContext);
  const [categoriesArray, setCategoriesArray] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      setCategoriesArray(categories);
      return categories;
    }
    loadCategories();
    console.log(categories)
    console.log(categoriesArray)
  }, [categories])

  return (
    <>
      <h1 className="mx-auto text-2xl tracking-widest">PRODUCTS</h1>
      <Select
        placeholder="hats"
        options={categoriesArray}
        onChange={(e) => {setSelectedCategory(e.value.toLowerCase())}}
      />
      <div className="flex flex-wrap border border-black h-full"> 
        {
          products?.map((item) => {
            return (
              <ProductCard key={item.id} item={item} />
            )
          })
        }
        <ProductCard key="newID" item={{
          id: "newID",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Plus_symbol.svg",
          name: "New Product",
          price: 0,
        }} />
      </div>
    </>
  )
}

export default Products