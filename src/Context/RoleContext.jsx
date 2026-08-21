
import { createContext, useState } from "react";
//eslint-disable-next-line
export const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const [roles, setRoles] = useState(() => {
    const stored = localStorage.getItem("roles");
    return stored ? JSON.parse(stored) : [""]; 
  });

  const updateRoles = (newRoles) => {
    setRoles(newRoles);
    localStorage.setItem("roles", JSON.stringify(newRoles));
  };

  return (
    <RoleContext.Provider value={{ roles, updateRoles }}>
      {children}
    </RoleContext.Provider>
  );
};