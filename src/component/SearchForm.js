import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function SearchForm({ handlSearch, setQuery, query }) {
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
