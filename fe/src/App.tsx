import "./App.css";

import { Routes, Route } from "react-router-dom";
import Signup from "./components/signup";
import Signin from "./components/signin";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
    </Routes>
  );
}
