import React, { useState, useEffect, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { format } from "date-fns";  // 🕒 Import thư viện format ngày
import ConversationService from "../../services/ConversationServices/";
import CustomModal from "../CustomModal";
import "./ChatPopup.css";

const ChatPopup = ({ open, onCancel }) => {
  const { user } = useSelector((state) => state.auth);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [conversationId, setConversationId] = useState(null);
  const patientId = user?.id;
  const messagesEndRef = useRef(null);

  // 🛠 Lấy tin nhắn khi mở popup
  useEffect(() => {
    if (open && patientId) {
      console.log("🔄 Lấy dữ liệu cuộc trò chuyện...");
      
      const fetchConversations = async () => {
        try {
          const res = await ConversationService.getPatientConversations(patientId);
          let conversations = res.data.data || res.data;
  
          if (Array.isArray(conversations) && conversations.length > 0) {
            const conversation = conversations[0];
            setConversationId(conversation._id);
  
            if (conversation.messages && Array.isArray(conversation.messages)) {
              setMessages(conversation.messages);
            } else {
              const msgRes = await ConversationService.getMessagesByConversationId(conversation._id);
              if (msgRes.data.success && Array.isArray(msgRes.data.messages)) {
                setMessages(msgRes.data.messages);
              } else {
                setMessages([]);
              }
            }
          } else {
            setMessages([]);
          }
        } catch (error) {
          console.error("❌ Lỗi lấy cuộc trò chuyện:", error);
        }
      };
  
      fetchConversations();
  
      return () => {}; // Cleanup nếu cần
    }
  }, [open, patientId]);

  // 🛠 Cuộn xuống cuối tin nhắn mới nhất
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 🛠 Hàm đồng bộ tin nhắn với server sau khi gửi
  const syncMessagesWithServer = useCallback(() => {
    if (conversationId) {
      ConversationService.getMessagesByConversationId(conversationId)
        .then((msgRes) => {
          if (msgRes.data.success && Array.isArray(msgRes.data.messages)) {
            setMessages(msgRes.data.messages);
          }
        })
        .catch((err) => console.error("❌ Lỗi cập nhật tin nhắn từ API:", err));
    }
  }, [conversationId]);

  // 🛠 Xử lý gửi tin nhắn
  const handleSendMessage = useCallback(async () => {
    if (!newMessage.trim() || !conversationId) {
      console.warn("⚠ Tin nhắn rỗng hoặc chưa có cuộc trò chuyện");
      return;
    }

    const messageData = {
      conversationId,
      senderId: user?.id,
      senderType: "Patient",
      content: newMessage,
      createdAt: new Date().toISOString(), // Thêm thời gian gửi
    };

    // 🛠 Thêm tin nhắn tạm thời vào UI
    const tempMessage = {
      ...messageData,
      _id: `temp_${Math.random().toString(36).substr(2, 9)}`,
      isPending: true, // Đánh dấu tin nhắn tạm thời
    };

    setMessages((prevMessages) => [...prevMessages, tempMessage]);
    setNewMessage("");

    try {
      console.log("📤 Đang gửi tin nhắn:", messageData);
      const res = await ConversationService.sendMessage(messageData);

      if (res.data.success) {
        console.log("✅ Gửi tin nhắn thành công:", res.data);

        // Cập nhật ID thật từ API và bỏ trạng thái pending
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg._id === tempMessage._id
              ? { ...msg, _id: res.data.messageId, isPending: false }
              : msg
          )
        );

        // 🔄 Đồng bộ tin nhắn với server
        setTimeout(syncMessagesWithServer, 1500);
      } else {
        console.error("❌ Gửi tin nhắn thất bại:", res.data);

        // Không xóa tin nhắn ngay lập tức, chỉ đặt trạng thái lỗi
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg._id === tempMessage._id ? { ...msg, isPending: false, isError: true } : msg
          )
        );
      }
    } catch (error) {
      console.error("❌ Lỗi gửi tin nhắn:", error);

      // Không xóa tin nhắn ngay lập tức, chỉ đặt trạng thái lỗi
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg._id === tempMessage._id ? { ...msg, isPending: false, isError: true } : msg
        )
      );
    }
  }, [newMessage, conversationId, user, syncMessagesWithServer]);

  return (
    <CustomModal open={open} footer={null} onCancel={onCancel} title="Trò chuyện cùng bác sĩ" width={800} style={{ top: 20 }}>
      <div className="chat-body">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div key={index} className={`message ${msg.senderType === "Patient" ? "patient" : "doctor"}`}>
              <p>{msg.content}</p>
              <small className="message-time">
                {msg.createdAt ? format(new Date(msg.createdAt), "HH:mm - dd/MM/yyyy") : "Đang gửi..."}
              </small>
            </div>
          ))
        ) : (
          <p className="empty-chat">Chưa có tin nhắn nào</p>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-footer">
        <input
          type="text"
          placeholder="Nhập tin nhắn..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
        />
        <button onClick={handleSendMessage}>Gửi</button>
      </div>
    </CustomModal>
  );
};

ChatPopup.propTypes = {
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ChatPopup;
