// src/components/ChatBox.js
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Chatbox.css'; // Import the CSS file

const socket = io('http://localhost:4000');

const ChatBox = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.off('message');
        };
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        if (input) {
            socket.emit('message', input);
            setInput('');
        }
    };

    return (
        <div className="container">
            <h1 className="text-center">Real-Time Chat</h1>
            <div className="chat-box">
                {messages.map((msg, index) => (
                    <div key={index} className={`border-bottom py-2 ${msg.startsWith('AI:') ? 'message-ai' : 'message-user'}`}>
                        {msg}
                    </div>
                ))}
            </div>
            <form onSubmit={sendMessage} className="input-group">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button className="btn btn-primary" type="submit">Send</button>
            </form>
        </div>
    );
};

export default ChatBox;
