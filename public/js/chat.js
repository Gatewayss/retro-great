const socket = io('http://127.0.0.1:3000/');
const messages = document.getElementById('messages');
const chatForm = document.getElementById('form');
const input = document.getElementById('input');
const messageDiv = document.getElementById('messages-div')
const room = document.querySelectorAll('.room')
const exitBtn = document.getElementById('exit-button')


chatForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const message = input.value;

  if (message) {
    socket.emit('chat message', message);

    const response = await fetch('/api/users/chat', {
      method: 'POST',
      body: JSON.stringify({ message }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      input.value = '';
    } else {
      alert(response.statusText);
    }
  }
});

// message from server
socket.on('chat message', (message) => {
  addMessage(message)
});

// bot messages 
socket.on('message', message => {
  addMessage(message)
})

// append to ul list
function addMessage(message) {
  const li = document.createElement('li');
  li.textContent = message
  messages.appendChild(li);
  window.scrollTo(0, document.body.scrollHeight);
}

// add event listener to each button/room to join it
room.forEach(function (room) {
  room.addEventListener('click', function () {
    const roomName = room.value
    socket.emit('join-room', roomName, message => {
      addMessage(message)
    })
  })
});





