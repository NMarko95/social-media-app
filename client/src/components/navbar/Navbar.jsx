import "./navbar.css";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MessageIcon from "@mui/icons-material/Message";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { logoutCall } from "../../pages/apiCalls";
import { useState } from "react";
import { io } from "socket.io-client";

const Navbar = () => {
  const { user, dispatch, socket } = useContext(AuthContext);

  const [isHovered, setIsHovered] = useState(false);
  const [notificationHover, setNotificationHover] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socket?.on("getNotification", (notification) => {
      setNotifications((prev) => [...prev, notification]);
    });
  }, [socket]);

  const handleNotificationHover = () => {
    setNotificationHover(!notificationHover);
  };

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
          <input placeholder="Search for friends..." className="search-input" />
        </div>
      </div>
      <div className="navbar-right">
        <div className="navbar-icons">
          {/*<div className="navbar-icon-item">
            <PersonIcon />
            <span className="navbar-badge"></span>
          </div>*/}
          <Link to="/messenger" className="navbar-icon-item">
            <MessageIcon />
            {/*<span className="navbar-badge"></span>*/}
          </Link>
          <div className="navbar-icon-item" onClick={handleNotificationHover}>
            <NotificationsIcon />
            {notifications.length !== 0 && (
              <span className="navbar-badge">{notifications.length}</span>
            )}
          </div>
          {notificationHover && (
            <div
              className={`navbar-list ${notifications.length === 0 && "empty"}`}
            >
              {notifications.length === 0 ? (
                <div className="navbar-list-item">
                  There are no new notifications.
                </div>
              ) : (
                <>
                  {notifications.map((notification, index) => {
                    const { senderName, type } = notification;
                    return (
                      <div className="navbar-list-item" key={index}>
                        <p className="navbar-list-item-text">
                          <Link
                            className="navbar-list-link"
                            to={`/profile/${senderName}`}
                          >
                            {senderName}
                          </Link>{" "}
                          has {type ? "disliked" : "liked"} your{" "}
                          <button className="modal-post-btn">post</button>.
                        </p>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          )}
        </div>
        <div className="navbar-profile">
          <span className="profile-name">{user.username}</span>
          <img
            src={user.profilePicture || "/assets/avatar.jpg"}
            alt=""
            className="navbar-image"
            onClick={() => setIsHovered(!isHovered)}
          />
          {isHovered && (
            <div className="navbar-profile-settings">
              <Link
                style={{ textDecoration: "none" }}
                className="signout-btn"
                to={`/profile/${user.username}`}
              >
                <span className="profile-settings-text">Profile</span>
              </Link>
              <button
                className="signout-btn"
                onClick={() => {
                  logoutCall(dispatch);
                }}
              >
                <span className="profile-settings-text">Sign out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
