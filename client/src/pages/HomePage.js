import React, { useState, useEffect } from "react";
import axios from "axios";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const getProducts = () => {
    axios
      .get("http://localhost:8080/product/getProduct")
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      {products.map((product) => (
        <>
          <div style={{ backgroundColor: "pink", margin: 5 }}>
            <h6>{product.name}</h6>
            <h6>{product.price}</h6>
            <h6>{product.category}</h6>
            <h6>{product.quantity}</h6>
          </div>
        </>
      ))}
    </>
  );
};

export default HomePage;
