"use client"
import { signInWithGooglePopup } from "./utils/firebase.utils";

import Products from "./components/products/products.component";
import ProductForm from "./components/product-form/product-form.component";

export default function Home() {
  /*
    Database is only mutable for authenticated Users
    which is ristricted in the firebase rules (only for user with certain ID)
  */
  const handleOnClick =  () => {
    signInWithGooglePopup();
  }

  return (
    <main className="flex flex-col h-full">
      <Products />
      <button onClick={handleOnClick} className="border-2 border-green-400 w-1/3 p-2 mx-auto rounded-md">Google</button>
      <ProductForm />
    </main>
  )
}
