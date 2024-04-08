"use client"
import Image from "next/image";
import { useEffect, useState, useContext } from "react";

import { ProductsContext } from "./context/products.context";
import { addDocument, getDocument, signInWithGooglePopup } from "./utils/firebase.utils";

import ProductCard from "./components/product-card/product-card.component";
import Products from "./components/products/products.component";

export default function Home() {
  const [collectionKey, setCollectionKey] = useState("");
  const [doc, setDocument] = useState();
  const [field, setField] = useState();

  let loadContext = useContext(ProductsContext);

  useEffect(() => {
    setDocument(loadContext.products);
    console.log(loadContext);
    // returns an Object
  }, [loadContext])
  
  console.log(doc)
/*
  useEffect(() => {
    const loadDoc = async () => {
      const docObject = await getDocument("categories", "hats");
      console.log(docObject.items)
      setDocument(docObject.items)      
    }
    loadDoc();
  }, [])
  console.log("doc")
  console.log (doc)
*/

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert(`${collectionKey}{${doc}: ${field}}`);
    addDocument();
  }

  const handleOnClick =  () => {
    signInWithGooglePopup();
  }

  return (
    <main className="flex flex-col h-screen">
      <form onSubmit={handleSubmit}>
        <label>Collection Key
          <input 
            className="border border-black rounded-sm m-5 w-2/4 h-10"
            type="text"
            value={collectionKey}
            onChange={(e) => setCollectionKey(e.target.value)}
          />
        </label>
        <br/>
        <label>Document
          <input 
            className="border border-black rounded-sm m-5 w-3/4 h-60"
            type="text"
            defaultValue={doc && doc[0].name}
            onChange={(e) => setDocument(Array.from(e.target.value))}
          />
        </label>
        <br/>
        <label>Field
          <input
            className="border border-black rounded-sm m-5 w-3/4 h-40"
            type="text"
            value={field}
            onChange={(e) => setField(e.target.value)}
          />
        </label>
        <br/>
        <input className="border border-blue-500 p-3 rounded-md" type="submit" />
      </form>
      <button onClick={handleOnClick}>Google</button>
      
      <div className="border border-black h-full"> 
        {
          doc?.map((item) => {
            return (
              <ProductCard key={item.id} item={item} />
            )
          })
        }
      </div>
      
    </main>
  )
}
