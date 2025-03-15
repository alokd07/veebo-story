import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./context/AuthProvider";
import ProtectedAdminRoute from "./ProtectedAdminRoute";
import NotFound from "./pages/NotFound";
import { useState } from "react";

function App() {
  const [open, setOpen] = useState(false);

  return (
    <Router>
      <AuthProvider>
        <Toaster position="top-right" reverseOrder={false} />
        <Navbar setModalOpen={setOpen} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <Dashboard open={open} setOpen={setOpen} />
              </ProtectedAdminRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;
