import "./rightbar.css";
import Online from "../online/Online";
import { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const Rightbar = ({ user, profile }) => {
  const [friends, setFriends] = useState([]);

  const { user: loggedUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        if (user._id !== undefined) {
          const { data } = await axios.get(
            `http://localhost:8800/api/users/friends/${user._id}`
          );
          setFriends(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchFriends();
  }, [loggedUser._id, user]);

  return (
    <div className="rightbar">
      <div className="rightbar-wrapper">
        {!profile ? (
          <>
            <div className="birthday-container">
              <img src="assets/gift.png" className="birthday-image" alt="" />
              <span className="birthday-text">
                <b>Marko Nikolic</b> and <b>3 other friends</b> have birthday
                today.
              </span>
            </div>
            <h4 className="rightbar-title">Online friends</h4>
            <ul className="rightbar-friend-list">
              {friends.length !== 0 &&
                friends.map((friend) => {
                  return <Online key={friend._id} user={friend} />;
                })}
            </ul>
          </>
        ) : (
          <>
            <h4 className="rightbar-title">User information</h4>
            <div className="rightbar-info">
              <div className="rightbar-info-item">
                <span className="rightbar-info-key">City:</span>
                <span className="rightbar-info-value">{user.city || ""}</span>
              </div>
              <div className="rightbar-info-item">
                <span className="rightbar-info-key">Relationship:</span>
                <span className="rightbar-info-value">
                  {user.relationship || ""}
                </span>
              </div>
            </div>
            <h4 className="rightbar-title">User friends</h4>
            <div className="rightbar-followings">
              {friends.length !== 0 &&
                friends.map((friend) => {
                  const { _id, username, profilePicture } = friend;
                  return (
                    <div key={_id} className="rightbar-following">
                      <Link to={`/profile/${username}`}>
                        <img
                          className="rightbar-following-image"
                          src={profilePicture || "/assets/avatar.jpg"}
                          alt=""
                        />
                      </Link>
                      <span className="rightbar-following-name">
                        {username}
                      </span>
                    </div>
                  );
                })}
            </div>
          </>
        )}
      </div>
      {/* Odluci sta ce ovde da ide */}
    </div>
  );
};

export default Rightbar;
