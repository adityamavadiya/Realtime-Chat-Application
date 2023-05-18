const socket = io('http://localhost:8000');


// get DOM elements in respective variables
const form = document.getElementById('send-container');   // get form by id
const messageInput = document.getElementById('messageInp');   // get message written in text box
const messageContainer = document.querySelector(".container");  // get container where we have to send our message
var audio = new Audio('audio.mp3')

// get name from user
const name1 = prompt("Enter your name ?");
console.log("name", name1)

// function to append message written by user to container
const append = (message, position)  =>{
    const messageElement = document.createElement('div')
    messageElement.innerText = message;
    messageElement.classList.add('message')
    messageElement.classList.add(position)
    messageContainer.append(messageElement)
    if(position == 'left') audio.play();
}

// let the server know when a new user joins
socket.emit('new-user-joined', name1);

// if a new user joins then receive their name from server
socket.on('user-joined', data =>{
    append(`${name1} has joined the chat.`, 'right')
})

// if server sends a message, then recieve it
socket.on('receive', data =>{
    append(`${data.name} : ${data.message}`, 'left')
})


// when an user leaves the chat, then append that info in container
socket.on('left', name =>{
    append(`${name.name} left the chat.`, 'right')
})


// when the form is submitted , then send the data to server
form.addEventListener('submit', (e) =>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right')
    socket.emit('send', message)
    messageInput.nodeValue = ''
})