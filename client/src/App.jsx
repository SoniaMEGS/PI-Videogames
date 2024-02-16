import React from "react";
import { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { Details, Form, Landing, Home } from "./pages";
import NavBar from "./components/NavBar.jsx";
import "./App.css";

function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/landing");
  }, []);
  return (
    <div>
      <div className="app">
        {pathname !== "/landing" && <NavBar />}
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/detail/:id" element={<Details />} />
          <Route path="/form" element={<Form />} />
          <Route path="/landing" element={<Landing />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
