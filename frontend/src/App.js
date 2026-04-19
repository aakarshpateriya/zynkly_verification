import { BrowserRouter, Routes, Route } from "react-router-dom";
import Verify from "./pages/Verify";
import Admin from "./pages/Admin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/verify/:token" element={<Verify />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;