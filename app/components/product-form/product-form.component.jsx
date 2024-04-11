import { useContext, useState, useEffect } from "react";
import { ProductsContext } from "@/app/context/products.context";
import { addDocument } from "@/app/utils/firebase.utils";

const ProductForm = () => {
    const [collectionKey, setCollectionKey] = useState("");
  const [doc, setDocument] = useState();
  const [field, setField] = useState();

  let loadContext = useContext(ProductsContext);

  useEffect(() => {
    setDocument(loadContext.products);
    console.log(loadContext);
    // returns an Object
  }, [loadContext])
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert(`${collectionKey}{${doc}: ${field}}`);
    addDocument();
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
            defaultValue={doc && doc[0].name}
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