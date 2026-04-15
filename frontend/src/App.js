import { BrowserRouter, Routes, Route } from "react-router-dom";
import Verify from "./Verify";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/verify/:id" element={<Verify />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;