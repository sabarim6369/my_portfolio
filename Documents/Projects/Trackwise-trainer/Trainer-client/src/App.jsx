import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import Programdetails from "./components/Programdetails/Programdetails";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import {jwtDecode} from "jwt-decode"; 
import useAuthStore from "./store/authstore";
function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const hideSidebarRoutes = ["/"];
 const setTrainer=useAuthStore((state)=>state.setTrainer)
 const clearTrainer=useAuthStore((state)=>state.clearTrainer);
  useEffect(() => {
    const validateToken = () => {
      const token = localStorage.getItem("trainerToken");

      if (!token) {
        clearTrainer();
        if (location.pathname !== "/") {
          navigate("/");
          toast.error("Session expired. Please log in again.");
        }
        return;
      }

      try {
        const decoded = jwtDecode(token);

        if (decoded.exp * 1000 < Date.now()) {
          toast.error("Session expired. Please log in again.");
          localStorage.removeItem("trainerToken");
          clearTrainer();
          navigate("/");
          return;
        }

        if (decoded.role !== "Trainer") {
          toast.error("Unauthorized access.");
          localStorage.removeItem("trainerToken");
          clearTrainer();
          navigate("/");
          return;
        }
        
        setTrainer(decoded.trainerId,decoded.email,decoded.Name);
        if (location.pathname === "/") {
          navigate("/dashboard");
        }
      } catch (error) {
        toast.error("Invalid token. Please log in again.");
        localStorage.removeItem("trainerToken");
        clearTrainer();
        navigate("/");
      }
    };

    validateToken();
  }, [location.pathname,navigate]);

  return (
    <div className="flex">
      {!hideSidebarRoutes.includes(location.pathname) && <Sidebar navigate={navigate}/>}
      <div className="flex-1">
        <Routes>
          <Route path="/dashboard" element={<Dashboard navigate={navigate}/>} />
          <Route path="/" element={<Login navigate={navigate}/>} />
          <Route path="/programdetails/:id" element={<Programdetails navigate={navigate}/>} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

export default App;
