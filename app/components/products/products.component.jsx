import { useContext, useEffect, useState } from "react";
import Select from "react-select";

import { ProductsContext } from "@/app/context/products.context";
import ProductCard from "../product-card/product-card.component";

const Products = () => {
  const { 
    products, 
    categories, 
    setSelectedCategory 
  } = useContext(ProductsContext);
  const [categoriesArray, setCategoriesArray] = useState([]);
  const [productsArray, setProductsArray] = useState(products);

  useEffect(() => {
    const loadCategories = async () => {
      setCategoriesArray(categories);
      return categories;
    }
    loadCategories();
    console.log(categories)
    console.log(categoriesArray)
  }, [categories]);

  useEffect(() => {
    setProductsArray(products);
    console.log(products);
  }, [products]);

  const addEmptyProduct = () => {
    const newProduct = {
      id: "newID",
      name: "",
      price: 0.00,
      imageUrl: "",
    };
    
    setProductsArray([...productsArray, newProduct]);
  };

  return (
    <>
      <h1 className="mx-auto text-2xl tracking-widest">PRODUCTS</h1>
      <Select
        placeholder="hats"
        options={categoriesArray}
        onChange={(e) => { setSelectedCategory(e.value.toLowerCase()) }}
      />
      <div className="flex flex-wrap border border-black h-full">
        {
          productsArray?.map((item) => {
            return (
              <ProductCard key={item.id} item={item} />
            )
          })
        }
        <div className="flex justify-center items-center w-1/4 ">
          <button 
            className="flex justify-center items-center h-1/7 border border-blue-500 bg-blue-300 rounded-md p-2 my-auto mx-auto hover:bg-blue-400"
            onClick={addEmptyProduct}
          >
            +
          </button>
        </div>
      </div>
    </>
  );
};

export default Products;