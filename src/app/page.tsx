"use client";

import dynamic from "next/dynamic";

// Dynamic import for the client-side part of the component
const DynamicChatbot: any = dynamic(() => import("../components/Chatbot"), {
  ssr: false,
});

const HomePage: React.FC = () => {
  return (
    <div className="container">
      <div className="left-side">
        <img
          src="https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-980x653.jpg"
          alt="Your Image"
        />
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
  );
};

export default HomePage;
