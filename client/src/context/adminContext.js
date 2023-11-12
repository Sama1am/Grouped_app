import React, { createContext, useState } from 'react';

export const AdminContext = createContext(null);

export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState();
  const [roomCodeC, setRoomCodeC] = useState();
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [roles, setRoles] = useState([]);
  const [token, setToken] = useState();
  const [studentNumber, setStudentNuber] = useState();

  const value = {
    isAdmin,
    setIsAdmin, 
    roomCodeC, 
    setRoomCodeC,
    userEmail,
    setUserEmail,
    roles,
    setRoles,
    userName,
    setUserName,
    studentNumber,
    setStudentNuber

  };


  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

