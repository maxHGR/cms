"use client"
import Image from "next/image"
import { useContext } from "react"
import { ProductsContext } from "./../../context/products.context"


const ProductCard = ({item}) => {
  const { updateProduct } = useContext(ProductsContext);
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

  // ERROR:
  // adds the same product to the Array again,
  // so that it´s doubled
  // and keeps it even through Category change
  const onSubmit = () => {
    try {
      //if(!productObject[item.id - 1].imageUrl.startsWith('http')){return};
      updateProduct(productObject);
      alert("successfully updated product");
    } catch (error) {
      alert(`failed to update product: ${error}`);
    }
  }
  
  // FIX 
  // Image catches an Error when the URL is invalid, catch the error and
  // display the User that the URL is invalid
  return (
    <>
      <div className="flex-row justify-center items-center w-1/4 p-3 border border-black rounded-lg">
        <Image src={productObject.imageUrl} onError={(e) => {alert(e)}} height={100} width={50} alt={productObject.name} />
        <input defaultValue={productObject.imageUrl} placeholder="imageUrl" type="text" onChange={(e) => onChangeHandler(e)} className="w-full border"/>
        <input defaultValue={productObject.name} placeholder="name" type="text" onChange={(e) => onChangeHandler(e)} className="w-full border"/>
        <input defaultValue={productObject.price} placeholder="price" type="text" onChange={(e) => onChangeHandler(e)} className="w-full border"/>
        <button className="border bg-green-300 rounded-md p-1" onClick={() => {onSubmit()}}>update</button>
      </div>
    </>
  )
}

export default ProductCard