import React, { createContext, useContext, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

export const socketContext = createContext();

export const useSockets = () => {
  return useContext(socketContext);
};

export const SocketProvider = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const socket = socketIOClient(process.env.HOST_API, {
    query: `userId=${user && user.id}`,
  });

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <socketContext.Provider value={socket}>
      {children}
    </socketContext.Provider>
  );
};
