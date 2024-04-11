"use client"
import Image from "next/image"

const ProductCard = ({item}) => {

  // functions that sum up the item object (id, name, url, price) 
  // and change if the input fields of the product card are changed
  // then the summed up item should replace the item in the original 
  // product object array, which is identified through id (id = index)

  return (
    <>
      <div className="flex-row justify-center items-center w-1/5 border border-black rounded-lg">
        <Image src={item.imageUrl} height={100} width={50} alt={item.name} />
        <p>{item.name}</p>
        <p>{item.price}</p>
      </div>
    </>
  )
}

export default ProductCard