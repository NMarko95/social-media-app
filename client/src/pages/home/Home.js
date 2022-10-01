import "./home.css";

import Feed from "../../components/feed/Feed";
import Navbar from "../../components/navbar/Navbar";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Navbar />
      <div className="home-container">
        <Sidebar />
        <Feed username={user.username} profile={false} />
        <Rightbar user={user} profile={false} />
      </div>
    </>
  );
};

export default Home;
