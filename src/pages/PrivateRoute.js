import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
// will remove later
//import { useUserContext } from "../context/user_context";

const PrivateRoute = ({ children }) => {
  //const { myUser } = useUserContext();
  const { user } = useAuth0();
  /*console.log(children); //console.log values will be shown only when we are on checkout page
  console.log(rest);*/
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};
export default PrivateRoute;
