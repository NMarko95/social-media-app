import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route element={user ? <Home /> : <Register />} exact path="/" />
        <Route element={user ? <Navigate to="/" /> : <Login />} path="/login" />
        <Route
          element={user ? <Navigate to="/" /> : <Register />}
          path="/register"
        />
        <Route element={<Profile />} path="/profile/:username" />
      </Routes>
    </Router>
  );
}

export default App;
