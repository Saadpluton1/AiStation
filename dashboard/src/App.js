import "./App.css";
import { SideBar } from "./components/Index";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Presales from "./screens/Presales";
import Presale from "./screens/Presale";

function App() {
  return (
    <div className="App main-body">
      <Router>
        <SideBar />
        <div className="main-section">
          <Routes>
            <Route path="/" element={<Presales />} />
            <Route path="/presale/:id" element={<Presale />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
