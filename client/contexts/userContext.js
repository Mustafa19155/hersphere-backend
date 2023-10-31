import React, {useEffect, useState} from 'react';
import {useAsyncStorage} from '../hooks/useAsyncStorage.js';

export const AuthContext = React.createContext();

function AuthProvider({children}) {
  const [user, setuser] = useAsyncStorage('user', null);

  const value = {
    user,
    setuser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export default AuthProvider;
