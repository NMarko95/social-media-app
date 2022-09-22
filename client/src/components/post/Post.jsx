import "./post.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Users } from "../../data";
import { useState } from "react";

const Post = ({ post }) => {
  const [like, setLike] = useState(post.like);
  const [isLiked, setIsLiked] = useState(false);

  const getUser = (id, isUsername) => {
    const user = Users.find((user) => user.id === id);
    return isUsername ? user.username : user.profilePicture;
  };

  const handleLike = () => {
    setLike((like) => (isLiked ? like - 1 : like + 1));
    setIsLiked(!isLiked);
  };

  return (
    <div className="post">
      <div className="post-wrapper">
        <div className="post-top">
          <div className="post-top-left">
            <img
              src={getUser(post.userId, false)}
              className="post-profile-image"
              alt=""
            />
            <span className="post-username">{getUser(post.userId, true)}</span>
            <span className="post-date">{post.date}</span>
          </div>
          <div className="post-top-right">
            <MoreVertIcon />
          </div>
        </div>
        <div className="post-center">
          <span className="post-text">{post?.desc}</span>
          <img src={post.photo} className="post-image" alt="" />
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
