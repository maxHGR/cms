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

  return (
    <>
      <h1 className="mx-auto text-2xl tracking-widest">PRODUCTS</h1>
      <Select
        placeholder="hats"
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