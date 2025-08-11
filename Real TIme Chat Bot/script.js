const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatBox = document.getElementById('chat-box');

const BOT_NAME = 'ChatBot';

// Predefined bot responses
const botResponses = [
  "Hello! How can I help you today?",
  "I'm here if you want to chat!",
  "That's interesting!",
  "Could you tell me more?",
  "I see. Go on...",
  "Thanks for sharing that with me!",
  "Have a great day!"
];

// Load chat history from localStorage or initialize empty array
let messages = JSON.parse(localStorage.getItem('chatMessages')) || [];

// Render messages to the chat box
function renderMessages() {
  chatBox.innerHTML = '';
  messages.forEach(msg => {
    const messageElem = document.createElement('div');
    messageElem.classList.add('message', msg.sender === 'user' ? 'sent' : 'received');
    messageElem.innerHTML = `
      <span>${msg.text}</span>
      <div class="timestamp">${msg.time}</div>
    `;
    chatBox.appendChild(messageElem);
  });
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Save messages to localStorage
function saveMessages() {
  localStorage.setItem('chatMessages', JSON.stringify(messages));
}

// Format time as HH:MM AM/PM
function formatTime(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  return `${hours}:${minutes} ${ampm}`;
}

// Add user message and trigger bot reply
function addUserMessage(text) {
  const now = new Date();
  messages.push({ sender: 'user', text, time: formatTime(now) });
  saveMessages();
  renderMessages();
  chatInput.value = '';
  setTimeout(botReply, 1000);
}

// Bot replies with a random message from the list
function botReply() {
  const now = new Date();
  const reply = botResponses[Math.floor(Math.random() * botResponses.length)];
  messages.push({ sender: 'bot', text: reply, time: formatTime(now) });
  saveMessages();
  renderMessages();
}

chatForm.addEventListener('submit', e => {
  e.preventDefault();
  const message = chatInput.value.trim();
  if (!message) return;
  addUserMessage(message);
});

// Initial render of chat history on page load
renderMessages();
