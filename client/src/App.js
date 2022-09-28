import Home from "./pages/home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Home />} exact path="/" />
        <Route element={<Login />} path="/login" />
        <Route element={<Register />} path="/register" />
        <Route element={<Profile />} path="/profile/:id" />
      </Routes>
    </Router>
  );
}

export default App;
