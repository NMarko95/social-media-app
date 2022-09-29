import "./navbar.css";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MessageIcon from "@mui/icons-material/Message";
import { Link } from "react-router-dom";

const Navbar = () => {
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
          <span className="profile-name">Natasa</span>
          <img
            src="/assets/person/1.jpeg"
            alt="pimg"
            className="navbar-image"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
