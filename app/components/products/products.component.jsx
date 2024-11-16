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
      <div className="flex justify-center items-center my-8">
        <h1 className="mx-auto text-2xl tracking-widest">PRODUCTS</h1>
      </div>
      <div className="mx-auto mb-8 w-4/5">
        <Select
          placeholder="Hats"
          options={categoriesArray}
          onChange={(e) => { setSelectedCategory(e.value.toLowerCase()) }}
        />
      </div>
      <div className="flex flex-wrap h-full">
        {
          productsArray?.map((item) => {
            return (
              <ProductCard key={item.id} item={item} />
            )
          })
        }
        <div className="flex justify-center items-center  basis-1/3 md:basis-1/5 ">
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