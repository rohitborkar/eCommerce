import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ProductsProvider } from "./context/products_context";
import { FilterProvider } from "./context/filter_context";
import { CartProvider } from "./context/cart_context";
import { UserProvider } from "./context/user_context";
import { Auth0Provider } from "@auth0/auth0-react";
/*
domain: rbp19.us.auth0.com
Client Secret: L58HrFBYPsaqF4z2WGNW3WynMTIpyo6JtdA9faDWij8y3w-XM3eR7pQZf025aH96
*/
/*const auth0ClientID = `${process.env.REACT_APP_AUTH0_CLIENTID}`;
const auth0Domain = `${process.env.REACT_APP_AUTH0_DOMAIN}`;
console.log(`${auth0Domain}`);
console.log(`${auth0ClientID}`);*/
ReactDOM.render(
  <Auth0Provider
    /*domain="hardcode values not recommended"
    clientId="hardcode values not recommended"*/
    /*clientId={auth0ClientID}
    domain={auth0Domain}*/
    domain={process.env.REACT_APP_AUTH0_DOMAIN}
    clientId={process.env.REACT_APP_AUTH0_CLIENTID}
    redirectUri={window.location.origin}
    cacheLocation="localstorage"
  >
    <UserProvider>
      <ProductsProvider>
        <FilterProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </FilterProvider>
      </ProductsProvider>
    </UserProvider>
  </Auth0Provider>,
  document.getElementById("root")
);
