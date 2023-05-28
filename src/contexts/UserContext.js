import React, { createContext } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [isLogged, setIsLogged] = React.useState(true);

  // Get user from async storage on app load

  // Update user on userData change

  // Clear storage on isLogged false

  return (
    <UserContext.Provider value={{ user, setUser, isLogged, setIsLogged }}>
      {children}
    </UserContext.Provider>
  );
}

