import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // Change to your backend URL after deploy

function Chat() {
  const { username } = useParams();
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    socket.on('receive_message', (data) => {
      if ((data.sender === user.username && data.receiver === username) ||
          (data.sender === username && data.receiver === user.username)) {
        setMessages((prev) => [...prev, data]);
      }
    });
  }, []);

  const handleSend = () => {
    const messageData = {
      sender: user.username,
      receiver: username,
      message: newMessage,
    };
    socket.emit('send_message', messageData);
    setNewMessage('');
  };

  return (
    <div>
      <h2>Chat with {username}</h2>
      <div>
        {messages.map((msg, idx) => (
          <div key={idx}>
            <b>{msg.sender === user.username ? "You" : msg.sender}:</b> {msg.message}
          </div>
        ))}
      </div>
      <input 
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default Chat;
