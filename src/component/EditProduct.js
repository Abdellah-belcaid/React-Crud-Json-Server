import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import apiService from "../service/AppService";

function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setname] = useState("");
  const [price, setprice] = useState(0);
  const [quantity, setquantity] = useState(0);
  const [checked, setchecked] = useState(false);

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  async function fetchProductDetails() {
    try {
      const response = await apiService.getProduct(id);
      const productData = response.data;
      setname(productData.name);
      setprice(productData.price);
      setquantity(productData.quantity);
      setchecked(productData.checked);
    } catch (error) {
      navigate("/products");
      toast.error("Error fetching product details: " + error.message); // Use toast notification for errors
      console.error("Error fetching product details: ", error);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedProduct = {
      name,
      price,
      quantity,
      checked,
    };

    try {
      const response = await apiService.updateProduct(id, updatedProduct);
      console.log("Product updated successfully:", response.data);
      alert("Product updated successfully:", response.data);
      navigate("/products");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-4">
            <div className="card-body">
              <h5 className="card-title">Edit Product</h5>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Product Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="price">Product Price</label>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    value={price}
                    onChange={(e) => setprice(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="quantity">Product Quantity</label>
                  <input
                    type="number"
                    className="form-control"
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setquantity(e.target.value)}
                    required
                  />
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="checked"
                    checked={checked}
                    onChange={() => setchecked(!checked)}
                  />
                  <label className="form-check-label" htmlFor="checked">
                    Checked
                  </label>
                </div>
                <button type="submit" className="btn btn-outline-success mt-3">
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
