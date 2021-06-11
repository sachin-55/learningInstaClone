import React, { createContext, useContext, useState } from 'react';

export const userContext = createContext();
export const setUserContext = createContext();

export const useUser = () => {
  return useContext(userContext);
};
export const useSetUser = () => {
  return useContext(setUserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState('');

  const saveUser = (value) => {
    setUser(value);
  };
  return (
    <userContext.Provider value={user}>
      <setUserContext.Provider value={saveUser}>
        {children}
      </setUserContext.Provider>
    </userContext.Provider>
  );
};
