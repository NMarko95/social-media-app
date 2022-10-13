import axios from "axios";
import { useEffect, useState } from "react";
import "./chatOnline.css";

const ChatOnline = ({ onlineUsers, currentUserId, setCurrentChat }) => {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  const handleClick = async (onlineFriend) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8800/api/conversations/find/${currentUserId}/${onlineFriend._id}`
      );
      setCurrentChat(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchFriends = async () => {
      const { data } = await axios.get(
        `http://localhost:8800/api/users/friends/${currentUserId}`
      );
      setFriends(data);
    };
    fetchFriends();
  }, [currentUserId]);

  useEffect(() => {
    let newUsers = [];
    friends.forEach((friend) => {
      onlineUsers.map((ou) => {
        if (friend._id === ou.user._id) {
          newUsers.push(friend);
        }
        return ou;
      });
    });
    setOnlineFriends(newUsers);
  }, [friends, onlineUsers]);

  return (
    <div className="chat-online">
      {onlineFriends.length !== 0 &&
        onlineFriends.map((of) => {
          return (
            <div
              className="chat-online-friend"
              key={of._id}
              onClick={() => handleClick(of)}
            >
              <div className="chat-online-img-container">
                <img
                  src={of.profilePicture || "/assets/avatar.jpg"}
                  alt=""
                  className="chat-online-img"
                />
                <div className="chat-online-badge"></div>
              </div>
              <span className="chat-online-username">{of.username}</span>
            </div>
          );
        })}
    </div>
  );
};

export default ChatOnline;
