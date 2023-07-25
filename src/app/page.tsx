"use client";

import dynamic from "next/dynamic";
import { React, createContext, useState, SetStateAction } from "react";
import ImageContext from "../contexts/ImageContext";

// Dynamic import for the client-side part of the component
const DynamicChatbot: any = dynamic(() => import("../components/Chatbot"), {
  ssr: false,
});

const HomePage: React.FC = () => {
  const [imageUrl, setImageUrl] = useState(
    "https://media.istockphoto.com/id/1423150648/photo/an-elderly-woman-in-a-denim-suit-sits-on-an-alpine-meadow-and-looks-towards-the-mountains.webp?s=2048x2048&w=is&k=20&c=F_kHf7N_1-jykxBzlssuaG_-_9O_4CvVej-2Jsv8jtE="
  );

  return (
    <ImageContext.Provider value={{ imageUrl, setImageUrl }}>
      <div className="container">
        <div className="left-side">
          <img src={imageUrl} alt="Your Image" />
        </div>
        <div className="right-side">
          <DynamicChatbot />
        </div>
        <style jsx>{`
          .container {
            display: flex;
            height: 100vh;
          }
          .left-side {
            flex: 2;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .right-side {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        `}</style>
      </div>
    </ImageContext.Provider>
  );
};

export default HomePage;
