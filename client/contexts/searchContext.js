import React, {useEffect, useState} from 'react';
import {useAsyncStorage} from '../hooks/useAsyncStorage.js';

export const SearchContext = React.createContext();

function SearchProvider({children}) {
  const [name, setname] = useState('');
  const [platforms, setplatforms] = useState([]);
  const [categories, setcategories] = useState([]);

  const value = {
    name,
    setname,
    platforms,
    setplatforms,
    categories,
    setcategories,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
}
export default SearchProvider;
