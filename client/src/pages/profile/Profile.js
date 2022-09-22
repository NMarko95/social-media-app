import "./profile.css";
import Feed from "../../components/feed/Feed";
import Navbar from "../../components/navbar/Navbar";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";

const Profile = () => {
  return (
    <>
      <Navbar />
      <div className="profile">
        <Sidebar />
        <div className="profile-right">
          <div className="profile-right-top">
            <div className="profile-cover">
              <img
                src="assets/post/3.jpeg"
                className="profile-cover-image"
                alt=""
              />
              <img
                src="assets/person/7.jpeg"
                className="profile-user-image"
                alt=""
              />
            </div>
            <div className="profile-info">
              <h4 className="profile-info-name">Marko Nikolic</h4>
              <h4 className="profile-info-desc">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              </h4>
            </div>
          </div>
          <div className="profile-right-bottom">
            <Feed />
            <Rightbar profile={true} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
