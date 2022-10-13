const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const ioServer = new Server(server);

const io = new Server({
  ...ioServer,
  cors: {
    origin: "http://localhost:3000",
  },
});

let onlineUsers = [];

const addNewUser = (user, socketId) => {
  !onlineUsers.some((u) => u.user.username === user.username) &&
    onlineUsers.push({ user, socketId });
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return onlineUsers.find((u) => u.user._id === userId);
};

io.on("connection", (socket) => {
  socket.on("newUser", (user) => {
    addNewUser(user, socket.id);
    console.log(`${user.username} has logged in.`);
    console.log(onlineUsers.length);
    io.emit("getUsers", onlineUsers);
  });

  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user.socketId).emit("getMessage", { senderId, text });
  });

  socket.on("sendNotification", ({ senderName, receiverName, type }) => {
    const receiver = getUser(receiverName);
    console.log(receiver);
    io.to(receiver.socketId).emit("getNotification", {
      senderName,
      type,
    });
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
    console.log(
      `Diskonektovan user. Preostalo je: ${onlineUsers.length} usera`
    );
    io.emit("getUsers", onlineUsers);
  });
});

io.listen(5000);
