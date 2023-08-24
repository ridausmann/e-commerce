import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const HomePage = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("id"));
  console.log("ehis is", loggedInUser);
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

  const handleDelete = async (productId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/product/deleteProduct/${productId}`
      );
      if (response.status === 200) {
        console.log("Product deleted successfully");
        getProducts(); // Fetch updated data after deletion
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <button>
        <Link to="/addProduct">Add product</Link>
      </button>
      {products.map((product) => (
        <div key={product._id} style={{ backgroundColor: "pink", margin: 5 }}>
          <h6>{product.name}</h6>
          <h6>{product.price}</h6>
          <h6>{product.category}</h6>
          <h6>{product.quantity}</h6>
          {product.userId === loggedInUser && (
            <>
              <button>
                <Link to={`/editProduct/${product._id}`}>Edit</Link>
              </button>
              <button onClick={() => handleDelete(product._id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </>
  );
};

export default HomePage;
