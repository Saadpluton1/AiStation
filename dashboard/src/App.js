import { useState } from "react";
import "./App.css";
import { SideBar, Header } from "./components/Index";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Blogs from "./screens/Blogs";
import Home from "./screens/Home";
import Users from "./screens/Users";
import Presales from "./screens/Presales";
import Presale from "./screens/Presale";

function App() {
  return (
    <div className="App main-body">
      <Router>
        <SideBar />
        <div className="main-section">
          {/* <Header/> */}
          <Routes>
            {/* <Route path="/users" element={<Users />} /> */}
            <Route path="/" element={<Presales />} />
            <Route path="/presale/:id" element={<Presale />} />
            {/* <Route path="/blogs" element={<Blogs />} /> */}
            {/* <Routes path="/" element={<Home />} /> */}
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
