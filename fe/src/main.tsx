import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain="dev-vh02subsbej64g4t.us.auth0.com"
    clientId="b9fU4IighdoEbjwIAH69TwnWIWKJWL5k"
    authorizationParams={{
      redirect_uri: "http://localhost:5173/dashboard",
    }}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Auth0Provider>
);
