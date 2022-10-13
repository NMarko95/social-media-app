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
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route element={user ? <Home /> : <Login />} exact path="/" />
        <Route element={user ? <Navigate to="/" /> : <Login />} path="/login" />
        <Route
          element={user ? <Navigate to="/" /> : <Register />}
          path="/register"
        />
        <Route element={<Profile />} path="/profile/:username" />
        <Route element={<Messenger />} path="/messenger" />
      </Routes>
    </Router>
  );
}

export default App;
