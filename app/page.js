"use client"
import { useEffect, useState } from "react";
import { addDocument, getDocument, signInWithGooglePopup } from "./utils/firebase.utils";
import Image from "next/image";

export default function Home() {
  const [collectionKey, setCollectionKey] = useState("");
  const [doc, setDocument] = useState();
  const [field, setField] = useState();

 

  useEffect(() => {

    const loadDoc = async () => {
      const docObject = await getDocument("categories", "hats");
      console.log(docObject.items)
/*    
      const docArray = [];
      docObject.items.forEach(item => {
        const itemArray = [item.id, item.imageUrl, item.name, item.price];
        docArray.push(itemArray)
      });
*/
      //console.log(docArray)
      setDocument(docObject.items)
      
    }

    loadDoc();

  }, [])
   
console.log (doc)

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
            value={doc}
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
        {doc?.map((item) => {
          return (
            <div className="w-2/5 border border-black flex-row justify-center" key={item.id}>
              <Image src={item.imageUrl} height={100} width={50} alt={item.name} />
              <p>{item.name}</p>
              <input value={item.price} type="text"></input>
            </div>
          )
        })}
      </div>
      
    </main>
  )
}
