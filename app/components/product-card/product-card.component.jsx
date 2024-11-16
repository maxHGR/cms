"use client"
import Image from "next/image"
import { useContext } from "react"
import { ProductsContext } from "./../../context/products.context"

import clothesIcon from "./../../assets/product-icon/clothes-hanger.png"


const ProductCard = ({item}) => {
  const { updateProduct, deleteProduct } = useContext(ProductsContext);
  const productObject = item;

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (err) {
      return false;
    }
  }

  const onChangeHandler = (e) => {
    productObject[e.target.placeholder] = e.target.value;
    console.log(productObject);
  }

  // FIX 
  // URL problem ?
  const onSubmit = () => {
    try {
      //if(!productObject[item.id - 1].imageUrl.startsWith('http')){return};
      //if(!window.confirm("update product?")) return;
      updateProduct(productObject);
      console.log("successfully updated product");
    } catch (error) {
      console.log(`failed to update product: ${error}`);
    }
  }

  const onDelete = (idToDelete) => {
    try {
      deleteProduct(productObject.id);
    } catch (error) {
      alert(`failed to delete product: ${error}`)
    }
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center basis-1/3 sm:basis-1/4 w-1/4 p-3 border border-black rounded-lg">
        <Image src={productObject.imageUrl ? productObject.imageUrl : clothesIcon} height={100} width={50} alt={productObject.name} className="mx-auto mb-4 h-1/3 w-full max-h-1/4"/>
        <div className="flex flex-col ">
          <input defaultValue={productObject.imageUrl} placeholder="imageUrl" type="text" onChange={(e) => onChangeHandler(e)} className="w-full border"/>
          <input defaultValue={productObject.name} placeholder="name" type="text" onChange={(e) => onChangeHandler(e)} className="w-full border"/>
          <input defaultValue={productObject.price} placeholder="price" type="text" onChange={(e) => onChangeHandler(e)} className="w-full border"/>  
        </div>
        <div className="flex flex-col flex-wrap w-full gap-y-3">
          <button className="border border-green-500 bg-green-300 rounded-md p-1 mt-4" onClick={() => {onSubmit()}}>update</button>
          <button className="border border-red-500 bg-red-300 rounded-md p-1" onClick={() => {onDelete()}}>delete</button>
        </div>
      </div>
    </>
  )
}

export default ProductCard