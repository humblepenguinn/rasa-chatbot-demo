import React, { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";

import ImageContext from "../contexts/ImageContext";

interface Message {
  text: string;
  isUser: boolean;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [count, setCount] = useState<number>(0);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const { setImageUrl } = useContext(ImageContext);

  const handleUserInput = async () => {
    if (userInput.trim() !== "") {
      const userMessage: Message = { text: userInput, isUser: true };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      setUserInput("");

      if (
        userInput.toLowerCase().includes("next") ||
        (userInput.toLowerCase().includes("next") &&
          userInput.toLowerCase().includes("image"))
      ) {
        try {
          if (count > 11) {
            return;
          }

          const response = await axios.post(
            "http://127.0.0.1:5000/get_image_url",
            {
              count: count,
            }
          );

          if (response.data) {
            setImageUrl(response.data.url);
          }

          setCount((prevCount) => prevCount + 1);
          const chatbotReply: Message = {
            text: "Here's the next image.",
            isUser: false,
          };
          setMessages((prevMessages) => [...prevMessages, chatbotReply]);
        } catch (error) {
          const chatBotReply: Message = {
            text: "Sorry, something went wrong. Please try again.",
            isUser: false,
          };

          setMessages((prevMessages) => [...prevMessages, chatBotReply]);
          console.error("Error sending request:", error);
        }

        return;
      }

      try {
        const response = await axios.post(
          "http://127.0.0.1:5000/get_response",
          {
            user_input: userInput,
          }
        );

        if (response.data) {
          const chatbotReply: Message = {
            text: response.data.response,
            isUser: false,
          };
          setMessages((prevMessages) => [...prevMessages, chatbotReply]);
        }
      } catch (error) {
        const chatBotReply: Message = {
          text: "Sorry, something went wrong. Please try again.",
          isUser: false,
        };

        setMessages((prevMessages) => [...prevMessages, chatBotReply]);
        console.error("Error sending request:", error);
      }
    }
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  const scrollUp = () => {
    if (chatContainerRef.current) {
      const newScrollTop =
        chatContainerRef.current.scrollTop -
        chatContainerRef.current.clientHeight;

      chatContainerRef.current.scrollTop = newScrollTop >= 0 ? newScrollTop : 0;
    }
  };

  const scrollDown = () => {
    if (chatContainerRef.current) {
      const newScrollTop =
        chatContainerRef.current.scrollTop +
        chatContainerRef.current.clientHeight;
      const maxScrollTop =
        chatContainerRef.current.scrollHeight -
        chatContainerRef.current.clientHeight;
      chatContainerRef.current.scrollTop =
        newScrollTop <= maxScrollTop ? newScrollTop : maxScrollTop;
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, []);

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
      <div className="scroll-buttons">
        <button onClick={scrollUp}>↑</button>
        <button onClick={scrollDown}>↓</button>
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
        .scroll-buttons {
          display: flex;
          justify-content: space-between;
          margin: 5px;
        }
      `}</style>
    </div>
  );
};

export default Chatbot;
