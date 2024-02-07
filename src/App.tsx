import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import ActiveUsers from "./pages/ActiveUsers";
import Profile from "./pages/Profile";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state: any) => state.auth.uid);
  return (
    <>
      <Routes>
        <Route
          path="/auth/signup"
          element={!user ? <Signup /> : <Navigate to="/" />}
        />
        <Route
          path="/auth/signin"
          element={!user ? <Signin /> : <Navigate to="/" />}
        />
        <Route
          path="/"
          element={user ? <Home /> : <Navigate to="/auth/signin" />}
        />
        <Route
          path="/users"
          element={user ? <ActiveUsers /> : <Navigate to="/auth/signin" />}
        />
        <Route
          path="/profile"
          element={user ? <Profile /> : <Navigate to="/auth/signin" />}
        />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
