import "./messenger.css";
import Navbar from "../../components/navbar/Navbar";
import Conversation from "../../components/conversation/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useRef } from "react";
import FriendsModal from "../../components/friendsModal/FriendsModal";
import { io } from "socket.io-client";

const Messenger = () => {
  const { user } = useContext(AuthContext);

  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [memberMessage, setMemberMessage] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();

  const messageRef = useRef();
  const scrollRef = useRef();

  const handleSendMessage = async () => {
    const message = {
      sender: user._id,
      text: messageRef.current.value,
      conversationId: currentChat._id,
    };
    try {
      const response = await axios.post(
        "http://localhost:8800/api/messages",
        message
      );

      const receiverId = currentChat.members.find(
        (member) => member !== user._id
      );
      socket.current.emit("sendMessage", {
        senderId: user._id,
        receiverId,
        text: messageRef.current.value,
      });
      setMessages((prev) => [...prev, response.data]);
      messageRef.current.value = "";
    } catch (error) {
      console.log(error);
    }
  };

  const handleFriendsModal = () => {
    setOpenModal(!openModal);
  };

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/api/conversations/${user._id}`
        );
        setConversations(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchConversations();
  }, [user._id]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (currentChat) {
        try {
          const response = await axios.get(
            `http://localhost:8800/api/messages/${currentChat._id}`
          );
          setMessages(response.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchMessages();
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    socket.current = io("ws://localhost:5000");
    socket.current.on("getMessage", (data) => {
      setMemberMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: new Date(),
      });
    });
  }, []);

  useEffect(() => {
    memberMessage &&
      currentChat?.members.includes(memberMessage.sender) &&
      setMessages((prev) => [...prev, memberMessage]);
  }, [memberMessage, currentChat]);

  useEffect(() => {
    socket.current && socket.current.emit("newUser", user);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  return (
    <>
      <Navbar />
      <div className="messenger">
        <div className="chat-menu">
          <div className="chat-menu-wrapper">
            <button
              className="add-conversation-btn"
              onClick={handleFriendsModal}
            >
              Add new conversation
            </button>
            <input
              className="chat-menu-input"
              placeholder="Search for friends..."
            />
            {/*conversations.length !== 0 &&
              conversations.map((c) => {
                return (
                  <div onClick={() => setCurrentChat(c)} key={c._id}>
                    <Conversation conversation={c} />
                  </div>
                );
              })*/}
          </div>
        </div>
        <div className="chat-box">
          <div className="chat-box-wrapper">
            {currentChat ? (
              <>
                <div className="chat-box-top">
                  {currentChat && messages.length !== 0 ? (
                    messages.map((m, index) => {
                      return (
                        <div key={index} ref={scrollRef}>
                          <Message message={m} own={m.sender === user._id} />
                        </div>
                      );
                    })
                  ) : (
                    <span className="no-messages-text">
                      No messages in this conversation. Say 'Hi' first to
                      lighten up someone's day
                    </span>
                  )}
                </div>
                <div className="chat-box-bottom">
                  <textarea
                    className="chat-message-input"
                    placeholder="Write message..."
                    ref={messageRef}
                  ></textarea>
                  <button
                    className="chat-submit-btn"
                    onClick={handleSendMessage}
                  >
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="no-conversation-text">
                Choose conversation or start new one.
              </span>
            )}
          </div>
        </div>
        <div className="chat-online">
          <div className="chat-online-wrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentUserId={user._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
      {openModal && (
        <FriendsModal
          conversations={conversations}
          handleFriendsModal={handleFriendsModal}
          setConversations={setConversations}
        />
      )}
    </>
  );
};

export default Messenger;
