import "./App.css";

import { Routes, Route } from "react-router-dom";
import Signup from "./components/signup";
import Signin from "./components/signin";
import Dashboard from "./components/dashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}
