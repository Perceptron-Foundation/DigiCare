import React, { useState } from 'react';

function ChatComponent() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    if (!input) return;

    const newMessage = {
      text: input,
      sender: 'user',
    };

    setMessages([...messages, newMessage]);
    fetchResponse(input);
    setInput('');
  };

  const fetchResponse = (question) => {
    fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.GEMINI_API_KEY}`, // Correct way
      },
      
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt: `Write a solution for the query asked based on Charaka Samhita and Ayurvedic ancient text.\nQuery: ${question}\nAnswer`,
        temperature: 0.7,
        max_tokens: 256,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const answer = data.choices[0].text.trim();
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: answer, sender: 'bot' },
        ]);
      })
      .catch((error) => console.error('Error:', error));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-4 max-w-md mx-auto">
        <div className="flex flex-col space-y-4 h-80 overflow-y-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`p-2 rounded-lg text-white ${
                  msg.sender === 'user' ? 'bg-green-600' : 'bg-gray-500'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Write a message..."
            className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-4 rounded-r-lg focus:outline-none hover:bg-indigo-500"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatComponent;
