import React, { useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const UserContext = React.createContext();
export const UserProvider = ({ children }) => {
  //extract default properties from Auth0
  const { isAuthenticated, loginWithRedirect, logout, user, isLoading } =
    useAuth0();

  const [myUser, setMyUser] = useState(null);

  useEffect(() => {
    /*console.log(`user:`);
    console.log(user);
    console.log(`isAuthenticated:${isAuthenticated}`);
    console.log(`isLoading:${isLoading}`);*/

    setMyUser(user);
    // console.log(myUser);
    // setMyUser(user);
  }, [user]);

  return (
    <UserContext.Provider
      value={{ loginWithRedirect, logout, myUser, isAuthenticated }}
    >
      {children}
    </UserContext.Provider>
  );
};

// define custom hook
export const useUserContext = () => {
  return useContext(UserContext);
};
