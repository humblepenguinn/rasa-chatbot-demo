import React, { useState, useRef, useEffect } from "react";

interface Message {
  text: string;
  isUser: boolean;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Function to handle user input and chatbot replies
  const handleUserInput = () => {
    if (userInput.trim() !== "") {
      const userMessage: Message = { text: userInput, isUser: true };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      setUserInput("");

      setTimeout(() => {
        const chatbotReply: Message = {
          text: "You said: " + userInput,
          isUser: false,
        };
        setMessages((prevMessages) => [...prevMessages, chatbotReply]);
      }, 500);
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chatbot">
      <div className="chat-container" ref={chatContainerRef}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chat-message ${message.isUser ? "user" : "bot"}`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Type your message here..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleUserInput();
            }
          }}
        />
      </div>
      <style jsx>{`
        .chatbot {
          display: flex;
          flex-direction: column;
          width: 33%;
          max-width: 400px;
          border: 1px solid #000000;
          border-radius: 5px;
          position: fixed;
          bottom: 10px;
          right: 10px;
        }
        .chat-container {
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .chat-message {
          background-color: #1b1e1f;
          border-radius: 5px;
          padding: 5px;
          margin: 5px 0;
          max-width: 80%;
        }
        .chat-message.user {
          background-color: #042f44;
          align-self: flex-end;
        }
        .chat-message.bot {
          background-color: #1b1e1f;
          align-self: flex-start;
        }
        .input-container {
          display: flex;
          align-items: center;
          margin-top: 10px;
        }
        input {
          flex: 1;
          padding: 8px;
          border: 1px solid #000000;
          border-radius: 5px;
          color: #000000;
        }
      `}</style>
    </div>
  );
};

export default Chatbot;
