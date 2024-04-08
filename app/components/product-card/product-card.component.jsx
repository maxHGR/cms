"use client"
import Image from "next/image"

const ProductCard = ({item}) => {

  

  return (
    <>
      <div className="w-2/5 border border-black flex-row justify-center">
        <Image src={item.imageUrl} height={100} width={50} alt={item.name} />
        <p>{item.name}</p>
        <p>{item.price}</p>
      </div>
    </>
  )
}

export default ProductCard