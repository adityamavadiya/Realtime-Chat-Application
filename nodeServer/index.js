// Node Server

// const { socket } = require("socket.io");

const io = require("socket.io")(8000)
// const http = require('http');
// const cors = require('cors');
const users = {};

io.on("connection", socket =>{

    //when a new user joins a chat, then it is broadcasted to others
    socket.on('new-user-joined', name=>{
        console.log("New user ", name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name)
    });
    

    //when a message is sent by someone, then it is broadcasted to others
    socket.on('send',message =>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });


    // notify to all when somenone leaves the chat
    socket.on('disconnect', message =>{
        socket.broadcast.emit('left', {message: message, name: users[socket.id]})
        delete users[socket.id]
    })
})