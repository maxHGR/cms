import { useState } from "react";
import { addDocument } from "@/app/utils/firebase.utils";

const ProductForm = () => {
  const [collectionKey, setCollectionKey] = useState("");
  const [doc, setDocument] = useState();
  const [field, setField] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert(`${collectionKey}{${doc}: ${field}}`);
    addDocument(collectionKey, doc, field);
    // ERROR
    // shows the "field" string as a key in the uploaded document
    // fix so that "field" doesnt gets displayed 
  }

  return (
    <>
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
            defaultValue={doc}
            onChange={(e) => setDocument(e.target.value)}
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
        <input className="border-2 border-blue-500 p-3 rounded-md" type="submit" />
      </form>
    </>
  )
}

export default ProductForm