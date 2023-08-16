import "@fortawesome/fontawesome-free/css/all.css";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import EditProduct from "./component/EditProduct";
import Home from "./component/Home";
import NewProduct from "./component/NewProduct";
import Products from "./component/Products";
import { AppContext, useAppState } from "./service/AppService";

function App() {
  const [currentRoute, setCurrentRout] = useState();
  useEffect(() => {
    const path = window.location.pathname.split("/")[1];
    setCurrentRout(path);
  }, []);

  return (
    <AppContext.Provider value={useAppState()}>
      <BrowserRouter>
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
          <span className="font-weight-bold h5">
            <i className="fas fa-home px-2"></i> My App |
          </span>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  onClick={() => setCurrentRout("home")}
                  className={
                    currentRoute === "home" ? "nav-link active" : "nav-link"
                  }
                  to="/home"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  onClick={() => setCurrentRout("products")}
                  className={
                    currentRoute === "products" ? "nav-link active" : "nav-link"
                  }
                  to="/products"
                >
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  onClick={() => setCurrentRout("newProduct")}
                  className={
                    currentRoute === "newProduct"
                      ? "nav-link active"
                      : "nav-link"
                  }
                  to="/newProduct"
                >
                  New Product
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <Routes>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/products" element={<Products />}></Route>
          <Route path="/newProduct" element={<NewProduct />}></Route>
          <Route
            path="/products/editProduct/:id"
            element={<EditProduct />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
