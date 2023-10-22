// Library Imports
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Style Imports
import "./App.css";

// Page Imports
import AdminHome from "./pages/home/AdminHome";
import WorkerHome from "./pages/home/WorkerHome";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/adminhome" element={<AdminHome />} />
            <Route path="/workerhome" element={<WorkerHome />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
