import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./Routers/Home";
import Tv from "./Routers/Tv";
import Search from "./Routers/Search";
import Header from "./Components/Header";

function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tv" element={<Tv />} />
        <Route path="/searh" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
