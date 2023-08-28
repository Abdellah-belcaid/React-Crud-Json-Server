import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { AppContext } from "../service/AppService";

function SearchForm({ fetchProducts }) {
  const [prodState, setProdState] = useContext(AppContext);
  const [query, setQuery] = useState("");
  const handlSearch = (event) => {
    event.preventDefault();
    fetchProducts(query, 1, prodState.pageSize);
  };
  return (
    <form onSubmit={handlSearch}>
      <div className="input-group">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="search"
          className="form-control rounded"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="search-addon"
        />
        <button type="submit" className="btn  btn-primary">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </form>
  );
}

export default SearchForm;
