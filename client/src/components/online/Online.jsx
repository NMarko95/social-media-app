import "../rightbar/rightbar.css";
import "./online.css";

/* Prebaci stilove iz rightbar.css u online.css */

const Online = ({ user }) => {
  return (
    <li className="rightbar-friend">
      <div className="rightbar-image-container">
        <img src="" className="rightbar-profile-image" alt="" />
        <span className="rightbar-online"></span>
      </div>
      <span className="rightbar-username">{user.username}</span>
    </li>
  );
};

export default Online;
