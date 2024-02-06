import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import ActiveUsers from "./pages/ActiveUsers";

function App() {
  return (
    <>
      <Routes>
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/signin" element={<Signin />} />
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<ActiveUsers />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
