import { useContext, useState } from "react";
import "./friendsModal.css";
import { AuthContext } from "../../context/AuthContext";
import { useEffect } from "react";
import axios from "axios";

const FriendsModal = ({
  conversations,
  setConversations,
  handleFriendsModal,
}) => {
  const { user } = useContext(AuthContext);

  const [friends, setFriends] = useState([]);

  // get friends who are not in conversations
  const handleFriends = (friends) => {
    let newFriends = [];
    let isPresent = false;
    friends.forEach((friend) => {
      isPresent = false;
      conversations.forEach((c) => {
        if (c.members.includes(friend._id)) {
          isPresent = true;
          return;
        }
      });
      if (!isPresent) {
        newFriends.push(friend);
      }
    });
    return newFriends;
  };

  const handleNewConversation = async (id) => {
    const newConversation = {
      senderId: id,
      receiverId: user._id,
    };
    const savedConversation = await axios.post(
      `http://localhost:8800/api/conversations/`,
      newConversation
    );
    setConversations([...conversations, savedConversation]);
  };

  useEffect(() => {
    const fetchFriends = async () => {
      const { data } = await axios.get(
        `http://localhost:8800/api/users/friends/${user._id}`
      );
      setFriends(handleFriends(data));
    };
    fetchFriends();
  }, [user._id]);

  return (
    <div className="friends-modal">
      <div className="friends-modal-wrapper">
        <button className="modal-wrapper-close" onClick={handleFriendsModal}>
          X
        </button>
        <span className="modal-wrapper-title">Choose from friends</span>
        {friends.length !== 0 &&
          friends.map((friend) => {
            return (
              <div
                key={friend._id}
                className="modal-friend"
                onClick={() => handleNewConversation(friend._id)}
              >
                <img
                  className="modal-friend-img"
                  src={friend.profilePicture || "/assets/avatar.jpg"}
                  alt=""
                />
                <span className="modal-friend name">{friend.username}</span>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default FriendsModal;
