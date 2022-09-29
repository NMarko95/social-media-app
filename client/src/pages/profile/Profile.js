import "./profile.css";
import Feed from "../../components/feed/Feed";
import Navbar from "../../components/navbar/Navbar";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState({});

  const { username } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(
        `http://localhost:8800/api/users?username=${username}`
      );
      //console.log(data);
      setUser(data);
    };
    fetchUser();
  }, [username]);

  return (
    <>
      <Navbar />
      <div className="profile">
        <Sidebar />
        <div className="profile-right">
          <div className="profile-right-top">
            <div className="profile-cover">
              <img
                src={user.coverPicture || ""}
                className="profile-cover-image"
                alt=""
              />
              <img
                src={user.profilePicture || "/assets/avatar.jpg"}
                className="profile-user-image"
                alt=""
              />
            </div>
            <div className="profile-info">
              <h4 className="profile-info-name">{user.username}</h4>
              <h4 className="profile-info-desc">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Excepturi unde eum maiores fuga consectetur nulla cu
              </h4>
            </div>
          </div>
          <div className="profile-right-bottom">
            <Feed username={user.username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
