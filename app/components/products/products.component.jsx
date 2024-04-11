"use client"
import { useContext, useEffect, useState } from "react"
import { ProductsContext } from "@/app/context/products.context"

import ProductCard from "../product-card/product-card.component"

const Products = () => {
  const [doc, setDocument] = useState();

  let loadContext = useContext(ProductsContext);

  useEffect(() => {
    setDocument(loadContext.products);
    console.log(loadContext);
    // returns an Object
  }, [loadContext])

  return (
    <>
      <p>PRODUCTS</p>
      <div className="flex flex-wrap gap-5 border border-black h-full"> 
        {
          doc?.map((item) => {
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