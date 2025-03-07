import React, { useState } from "react";
import { FaCommentDots } from "react-icons/fa";
import ChatPopup from "./ChatPopup"; // Import Popup chat
import "./MessengerIcon.css";

const MessengerIcon = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleTogglePopup = () => {
    console.log("Bấm vào icon Messenger, isOpen trước:", isOpen);
    setIsOpen(true);
  };

  return (
    <>
      {/* Icon Messenger */}
      <div className="messenger-icon" onClick={()=> setIsOpen(true)}>
        <FaCommentDots size={30} />
      </div>

      {/* Hiển thị Popup khi mở */}
      {isOpen && <ChatPopup open={isOpen} onCancel={() => setIsOpen(false)} />}
    </>
  );
};

export default MessengerIcon;
