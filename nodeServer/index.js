// Node Server

// const { socket } = require("socket.io");

const io = require("socket.io")(8000)
// const http = require('http');
// const cors = require('cors');
const users = {};

io.on("connection", socket =>{
    socket.on('new-user-joined', name=>{
        console.log("New user ", name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name)
    });
    
    socket.on('send',message =>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });

    socket.on('disconnect', message =>{
        socket.broadcast.emit('left', {message: message, name: users[socket.id]})
        delete users[socket.id]
    })
})