import {
  faCheckCircle,
  faEdit,
  faTimesCircle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService, { AppContext } from "../service/AppService";
import SearchForm from "./SearchForm";

function Products() {
  const navigate = useNavigate();
  const [prodState, setProdState] = useContext(AppContext);

  useEffect(() => {
    fetchProducts(prodState.keyword, prodState.currentPage, prodState.pageSize);
  }, []);

  const fetchProducts = async (keyword, currentPage, sizePage) => {
    try {
      const response = await apiService.getAllProducts(
        keyword,
        currentPage,
        sizePage
      );
      const totalElementCount = response.headers["x-total-count"];
      let totalPages = Math.floor(totalElementCount / sizePage);
      if (totalElementCount % sizePage !== 0) ++totalPages;
      setProdState({
        ...prodState,
        products: response.data,
        currentPage: currentPage,
        keyword: keyword,
        sizePage: sizePage,
        totalPages: totalPages,
      });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await apiService.deleteProduct(productId);
      fetchProducts(
        prodState.keyword,
        prodState.currentPage,
        prodState.sizePage
      ); // Refresh the products list after deletion
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const changeCheckedState = async (product) => {
    try {
      await apiService.updateCheckedStatus(product);
      fetchProducts(
        prodState.keyword,
        prodState.currentPage,
        prodState.sizePage
      ); // Refresh the products list after update
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleGoToPage = (page) => {
    fetchProducts(prodState.keyword, page, prodState.pageSize);
  };

  return (
    <div className="container-fluid mt-2">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title position-relative">
            Product List{" "}
            <span className="bg bg-info bg-pill  position-absolute top-0 start-100 translate-middle  rounded-pill ">
              {prodState.products.length}
            </span>
          </h5>
          <div className="row g-2 mt-2">
            <div className="col-auto">
              <SearchForm
                fetchProducts={fetchProducts}               
              ></SearchForm>
            </div>
          </div>
          <table className="table align-middle mb-0 bg-white">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Checked</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {prodState.products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.quantity}</td>
                  <td>
                    <button
                      onClick={() => changeCheckedState(product)}
                      className={
                        product.checked
                          ? "btn btn-outline-success btn-sm"
                          : "btn btn-outline-danger btn-sm"
                      }
                    >
                      <FontAwesomeIcon
                        icon={product.checked ? faCheckCircle : faTimesCircle}
                      />
                    </button>
                  </td>
                  <td className="d-flex align-items-center">
                    <button
                      className="btn btn-link btn-sm ml-3"
                      onClick={() => navigate(`editProduct/${product.id}`)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      className="btn  btn-link btn-sm "
                      onClick={() => handleDelete(product.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <nav aria-label="...">
            <ul className="pagination justify-content-end mt-3 mb-1">
              <li className="page-item ">
                <button
                  onClick={() => handleGoToPage(prodState.currentPage - 1)}
                  className={
                    prodState.currentPage !== 1
                      ? "page-link"
                      : "page-link disabled"
                  }
                >
                  Previous
                </button>
              </li>

              {new Array(prodState.totalPages).fill(0).map((v, index) => (
                <li key={index + 1} className="page-item ">
                  <button
                    onClick={() => handleGoToPage(index + 1)}
                    className={
                      prodState.currentPage === index + 1
                        ? "page-link active"
                        : "page-link "
                    }
                  >
                    {index + 1}
                  </button>
                </li>
              ))}

              <li className="page-item">
                <button
                  onClick={() => handleGoToPage(prodState.currentPage + 1)}
                  className={
                    prodState.totalPages !== prodState.currentPage
                      ? "page-link"
                      : "page-link disabled"
                  }
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Products;
