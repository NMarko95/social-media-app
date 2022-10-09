import "./post.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Post = ({ post }) => {
  const [like, setLike] = useState(post.likes.length);
  const [user, setUser] = useState({});
  const { user: currentUser, socket } = useContext(AuthContext);
  const [isLiked, setIsLiked] = useState(post.likes.includes(currentUser._id));

  const handleLike = () => {
    try {
      axios.put(`http://localhost:8800/api/posts/${post._id}/like`, {
        userId: currentUser._id,
      });
      socket.emit("sendNotification", {
        senderName: currentUser.username,
        receiverName: user.username,
        type: isLiked,
      });
    } catch (error) {
      console.log(error);
    }
    setLike((like) => (isLiked ? like - 1 : like + 1));
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(
        `http://localhost:8800/api/users?userId=${post.userId}`
      );
      //console.log(data);
      setUser(data);
    };
    fetchUser();
  }, [post.userId]);

  return (
    <div className="post">
      <div className="post-wrapper">
        <div className="post-top">
          <div className="post-top-left">
            <Link to={`/profile/${user.username}`}>
              <img
                src={user.profilePicture || "/assets/avatar.jpg"}
                className="post-profile-image"
                alt=""
              />
            </Link>

            <span className="post-username">{user.username}</span>
            <span className="post-date">{format(post.createdAt)}</span>
          </div>
          <div className="post-top-right">
            <MoreVertIcon />
          </div>
        </div>
        <div className="post-center">
          <span className="post-text">{post.desc || ""}</span>
          <img src={post.image || ""} className="post-image" alt="" />
        </div>
        <div className="post-bottom">
          <div className="post-bottom-left">
            <ThumbUpIcon
              className={`like-icon ${isLiked && "liked"}`}
              src="/assets/like.png"
              onClick={handleLike}
              alt=""
            />
            <span className="like-counter"> {like} people like it</span>
          </div>
          <div className="post-bottom-right">
            <span className="post-comment-text">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
