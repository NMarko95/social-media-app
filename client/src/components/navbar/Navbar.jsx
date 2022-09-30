import "./navbar.css";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MessageIcon from "@mui/icons-material/Message";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="navbar-container">
      <div className="navbar-left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">SocialMedia</span>
        </Link>
      </div>
      <div className="navbar-center">
        <div className="searchbar">
          <SearchIcon className="searchbar-icon" />
          <input
            placeholder="Search for friends, posts, ..."
            className="search-input"
          />
        </div>
      </div>
      <div className="navbar-right">
        <div className="navbar-icons">
          <div className="navbar-icon-item">
            <PersonIcon />
            <span className="navbar-badge">1</span>
          </div>
          <div className="navbar-icon-item">
            <MessageIcon />
            <span className="navbar-badge">2</span>
          </div>
          <div className="navbar-icon-item">
            <NotificationsIcon />
            <span className="navbar-badge">1</span>
          </div>
        </div>
        <div className="navbar-profile">
          <span className="profile-name">{user.username}</span>
          <Link to={`/profile/${user.username}`}>
            <img
              src={user.profilePicture || "/assets/avatar.jpg"}
              alt=""
              className="navbar-image"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
