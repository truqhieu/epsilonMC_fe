import React, { useState, useEffect } from "react";
import { Badge } from "antd";
import { FaCommentDots } from "react-icons/fa";
import ChatPopup from "./ChatPopup";
import "./MessengerIcon.css";
import { useSelector } from "react-redux";
import ConversationService from "../../services/ConversationServices";

const MessengerIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const { user } = useSelector((state) => state.auth);

  // Thêm effect để lấy số tin nhắn chưa đọc
  useEffect(() => {
    const fetchUnreadCount = async () => {
      if (!user?.id) return;

      try {
        const response = await ConversationService.getUnreadCount(user.id);
        if (response?.success) {
          setUnreadCount(response.unreadCount);
        }
      } catch (error) {
        console.error("❌ Lỗi khi lấy số tin nhắn chưa đọc:", error.message);
      }
    };

    if (user?.id) {
      const interval = setInterval(fetchUnreadCount, 10000);
      fetchUnreadCount();
      return () => clearInterval(interval);
    }
  }, [user?.id]);

  const handleTogglePopup = async () => {
    console.log(" Bắt đầu xử lý toggle popup");

    if (user?.id) {
      try {
        const conversations = await ConversationService.getPatientConversations(
          user.id
        );
        const conversationList = conversations?.data;
        if (Array.isArray(conversationList) && conversationList.length > 0) {
          for (const conv of conversationList) {
            if (conv?._id) {
              const markResponse = await ConversationService.markMessagesAsRead(
                conv._id
              );
            }
          }
          setUnreadCount(0);
        } else {
          console.log("ℹ️ Không có conversation nào cần đánh dấu đã đọc");
        }
      } catch (error) {
        console.error(" Lỗi trong quá trình xử lý:", error);
        console.error("Chi tiết lỗi:", error.response?.data || error.message);
      }
    } else {
      console.log(" Không có user.id, bỏ qua việc đánh dấu đã đọc");
    }

    setIsOpen(!isOpen);
  };

  return (
    <>
      <Badge count={unreadCount} className="messenger-badge">
        <div className="messenger-icon" onClick={handleTogglePopup}>
          <FaCommentDots size={30} />
        </div>
      </Badge>

      {isOpen && <ChatPopup open={isOpen} onCancel={() => setIsOpen(false)} />}
    </>
  );
};

export default MessengerIcon;
