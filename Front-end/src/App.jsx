import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Cashier from "./Cashier";
import AdminDashboard from "./AdminDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        
        <Route path="/manager" element={<AdminDashboard />} />
        
        <Route path="/cashier" element={<Cashier />} />
      </Routes>
    </Router>
  );
}

export default App;