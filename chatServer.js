//establishing a chat Server

const express=require('express');
const port=5000; 
const app=express();

const chatServer=require("http").Server(app);
const chatSockets=require("./config/chatSockets").chatSockets(chatServer);
chatServer.listen(port);

console.log("Chat server is running at port",port);