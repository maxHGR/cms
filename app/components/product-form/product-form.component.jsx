import { useState } from "react";
import { addDocument } from "@/app/utils/firebase.utils";

const ProductForm = () => {
  const [doc, setDocument] = useState();
  const [field, setField] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("product-form")
    console.log(`{${doc}: ${field}}`);
    addDocument(doc, field);
  }

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)} className="border-2 border-blue-400 rounded-lg m-2 p-1">
        <label className="m-5">add Category
        <br/>
          <input 
            className="border border-black rounded-sm m-5 w-2/4 h-12 p-2"
            type="text"
            defaultValue={doc}
            onChange={(e) => setDocument(e.target.value)}
          />
        </label>
        <br/>
        <input className="border-2 border-blue-500 p-3 rounded-md" type="submit" />
      </form>
    </>
  )
}

export default ProductForm