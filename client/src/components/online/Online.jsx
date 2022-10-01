import "../rightbar/rightbar.css";
import "./online.css";
import { Link } from "react-router-dom";

/* Prebaci stilove iz rightbar.css u online.css */

const Online = ({ user }) => {
  const { username, profilePicture } = user;
  return (
    <li className="rightbar-friend">
      <div className="rightbar-image-container">
        <Link to={`/profile/${username}`}>
          <img
            src={profilePicture || "/assets/avatar.jpg"}
            className="rightbar-profile-image"
            alt=""
          />
        </Link>
        <span className="rightbar-online"></span>
      </div>
      <span className="rightbar-username">{username}</span>
    </li>
  );
};

export default Online;
