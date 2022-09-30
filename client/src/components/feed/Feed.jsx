import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const Feed = ({ username }) => {
  const { user } = useContext(AuthContext);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = username
        ? await axios.get(`http://localhost:8800/api/posts/profile/${username}`)
        : await axios.get(
            `http://localhost:8800/api/posts/timeline/${user._id}`
          );
      //console.log(data);
      setPosts(data);
    };
    fetchPosts();
  }, [username, user._id]);

  return (
    <div className="feed">
      <div className="feed-wrapper">
        <Share />
        {posts.length !== 0 &&
          posts.map((post) => {
            return <Post key={post._id} post={post} />;
          })}
      </div>
    </div>
  );
};

export default Feed;
