const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');   // get form by id
const messageInput = document.getElementById('messageInp');   // get message written in text box
const messageContainer = document.querySelector(".container");  // get container where we have to send our message
var audio = new Audio('audio.mp3')

// const name1 = prompt("Enter your name ?");
console.log("name", name1)
const append = (message, position)  =>{
    const messageElement = document.createElement('div')
    messageElement.innerText = message;
    messageElement.classList.add('message')
    messageElement.classList.add(position)
    messageContainer.append(messageElement)
    if(position == 'left') audio.play();
}
socket.emit('new-user-joined', name1);

socket.on('user-joined', data =>{
    append(`${name1} has joined the chat.`, 'right')
})

socket.on('receive', data =>{
    append(`${data.name} : ${data.message}`, 'left')
})

socket.on('left', name =>{
    append(`${name.name} left the chat.`, 'left')
})

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right')
    socket.emit('send', message)
    messageInput.nodeValue = ''
})