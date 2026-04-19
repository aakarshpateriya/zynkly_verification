import { BrowserRouter, Routes, Route } from "react-router-dom";
import Verify from "./pages/Verify";
import Admin from "./pages/Admin";
import Login from "./pages/Login"; // ✅ ADD THIS

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/verify/:token" element={<Verify />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} /> {/* ✅ ADD THIS */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;