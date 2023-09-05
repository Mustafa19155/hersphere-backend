import React, {useEffect, useState} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';

export const AuthContext = React.createContext();

function AuthProvider({children}) {
  const [user, setuser] = useState(null);

  useEffect(() => {
    setuser(EncryptedStorage.getItem('user'));
  }, []);

  async function login(data) {
    setuser(EncryptedStorage.setItem('user', data));
  }
  function logout() {
    setuser(null);
  }

  const value = {
    user,
    setuser,
    logout,
    login,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export default AuthProvider;
