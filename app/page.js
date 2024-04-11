"use client"
import Image from "next/image";
import { useEffect, useState, useContext } from "react";

import { ProductsContext } from "./context/products.context";
import { addDocument, getDocument, signInWithGooglePopup } from "./utils/firebase.utils";

import ProductCard from "./components/product-card/product-card.component";
import Products from "./components/products/products.component";
import ProductForm from "./components/product-form/product-form.component";

export default function Home() {

  /*
    Database is only mutable for authenticated Users
    which is ristricted in the firebase rules (only for max...@....com)
    
  */

  const handleOnClick =  () => {
    signInWithGooglePopup();
  }

  return (
    <main className="flex flex-col h-screen">
      <ProductForm />
      <button onClick={handleOnClick} className="border-2 border-green-400 w-1/3 p-2 mx-auto rounded-md">Google</button>
      <Products />
    </main>
  )
}
