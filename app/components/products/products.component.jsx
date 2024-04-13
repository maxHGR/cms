import { useContext, useEffect, useState } from "react"
import { ProductsContext } from "@/app/context/products.context"
import Select from "react-select"

import ProductCard from "../product-card/product-card.component"



const Products = () => {
  const { 
    products, 
    categories, 
    setSelectedCategory 
  } = useContext(ProductsContext);

  /*
      Future code:
      Drop List (react-select?) 
      that lets you select the Category to be displayed

      create a list of categories in "ProductsContext" which reads
      the categories of the database and displays it in the select input
  */

  return (
    <>
      <h1 className="mx-auto text-2xl tracking-widest">PRODUCTS</h1>
      <Select
        options={categories}
        onChange={(e) => {setSelectedCategory(e.value)}}
      />
      <div className="flex flex-wrap border border-black h-full"> 
        {
          products?.map((item) => {
            return (
              <ProductCard key={item.id} item={item} />
            )
          })
        }
      </div>
    </>
  )
}

export default Products