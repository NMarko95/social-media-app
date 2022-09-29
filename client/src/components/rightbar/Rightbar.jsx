import "./rightbar.css";
import { Users } from "../../data";
import Online from "../online/Online";

const Rightbar = ({ user }) => {
  return (
    <div className="rightbar">
      <div className="rightbar-wrapper">
        {!user ? (
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
              {Users.map((user) => {
                return <Online key={user._id} user={user} />;
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
              <div className="rightbar-following">
                <img className="rightbar-following-image" src="" alt="" />
                <span className="rightbar-following-name">Natasa Nikolic</span>
              </div>
              <div className="rightbar-following">
                <img className="rightbar-following-image" src="" alt="" />
                <span className="rightbar-following-name">Marko Nikolic</span>
              </div>
              <div className="rightbar-following">
                <img className="rightbar-following-image" src="" alt="" />
                <span className="rightbar-following-name">Andjela Nikolic</span>
              </div>
              <div className="rightbar-following">
                <img className="rightbar-following-image" src="" alt="" />
                <span className="rightbar-following-name">Ivan Nikolic</span>
              </div>
            </div>
          </>
        )}
      </div>
      {/* Odluci sta ce ovde da ide */}
    </div>
  );
};

export default Rightbar;
