import axios from "axios";
import { useState, useContext, createContext } from "react";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [values, setValues] = useState({
    keyword:"",
    results:[]
  });


  return (
    <SearchContext.Provider value={{ values, setValues }}>
      {children}
    </SearchContext.Provider>
  );
};


//custom Hook
const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };
