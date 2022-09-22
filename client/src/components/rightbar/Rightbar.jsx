import "./rightbar.css";
import { Users } from "../../data";
import Online from "../online/Online";

const Rightbar = () => {
  return (
    <div className="rightbar">
      <div className="rightbar-wrapper">
        <div className="birthday-container">
          <img src="assets/gift.png" className="birthday-image" alt="" />
          <span className="birthday-text">
            <b>Marko Nikolic</b> and <b>3 other friends</b> have birthday today.
          </span>
        </div>
      </div>
      {/* Odluci sta ce ovde da ide */}
      <h4 className="rightbar-title">Online friends</h4>
      <ul className="rightbar-friend-list">
        {Users.map((user) => {
          return <Online key={user.id} user={user} />;
        })}
      </ul>
    </div>
  );
};

export default Rightbar;
