import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { Posts } from "../../data";

const Feed = () => {
  return (
    <div className="feed">
      <div className="feed-wrapper">
        <Share />
        {Posts.map((post) => {
          return <Post key={post.id} post={post} />;
        })}
      </div>
    </div>
  );
};

export default Feed;
