import axios from "axios";
import { createContext, useState } from "react";

const API_BASE_URL = "https://json-server-vercel-phi-nine.vercel.app";
//const API_BASE_URL = "http://localhost:8000";
export const AppContext = createContext();

const apiService = {
  getAllProducts: async (keyword = "", page = 1, size = 5) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/products?name_like=${keyword}&_page=${page}&_limit=${size}`
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },

  getProduct: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/${id}`);
      return response;
    } catch (error) {
      console.error("Error fetching product:", error);
      throw error;
    }
  },

  createProduct: async (productData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/products`,
        productData
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  updateProduct: async (productId, productData) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/products/${productId}`,
        productData
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  deleteProduct: async (productId) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/products/${productId}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  updateCheckedStatus: async (product) => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/products/${product.id}`,
        { checked: !product.checked }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default apiService;

export const useAppState = () => {
  const initialState = {
    products: [],
    currentPage: 1,
    pageSize: 5,
    keyword: "",
    totalPages: 0,
  };
  const appState = useState(initialState);
  return appState;
};
