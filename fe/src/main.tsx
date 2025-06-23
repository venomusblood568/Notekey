import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";

const container = document.getElementById("root");

if (!container) {
  throw new Error(
    "Root container not found. Make sure there's a <div id='root'></div> in your index.html."
  );
}

ReactDOM.createRoot(container).render(
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
