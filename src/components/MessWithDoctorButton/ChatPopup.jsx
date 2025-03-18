// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import ConversationService from "../../services/ConversationServices/";
import CustomModal from "../CustomModal";
import "./ChatPopup.css";

const ChatPopup = ({ open, onCancel }) => {
  const { user } = useSelector((state) => state.auth);
  const patientId = user?.id;
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [conversationId, setConversationId] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchMessages = useCallback(async (convId) => {
    if (!convId) return;

    try {
      const msgRes = await ConversationService.getMessagesByConversationId(convId);
      setMessages(msgRes?.data || []);
    } catch (error) {
      console.error("❌ Lỗi lấy tin nhắn:", error);
    }
  }, []);

  const fetchConversations = useCallback(async () => {
    if (!patientId) return;

    try {
      const newConv = await ConversationService.checkAndStartConversation(patientId);
      if (newConv?.success && newConv?.data) {
        setConversationId(newConv.data._id);
        setMessages([]);
      }
    } catch (error) {
      console.log("❌ Lỗi lấy cuộc trò chuyện:", error);
    }
  }, [patientId]);

  useEffect(() => {
    if (open && patientId) {
      setLoading(true);
      fetchConversations();
      setLoading(false);
    }
  }, [open, patientId, fetchConversations]);

  useEffect(() => {
    if (conversationId) {
      fetchMessages(conversationId);
    }
  }, [conversationId, fetchMessages]);

  useEffect(() => {
    if (conversationId) {
      const intervalId = setInterval(() => {
        fetchMessages(conversationId); // Gọi lại API để cập nhật tin nhắn
      }, 5000); // 5 giây

      // Dọn dẹp interval khi component bị unmount hoặc conversationId thay đổi
      return () => clearInterval(intervalId);
    }
  }, [conversationId, fetchMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = useCallback(async () => {
    if (!newMessage.trim() || !conversationId) return;

    const messageData = {
      conversationId,
      senderId: patientId,
      senderType: "Patient",
      content: newMessage,
      createdAt: new Date().toISOString(),
    };

    const tempMessage = { ...messageData, _id: `temp_${Date.now()}`, isPending: true };
    setMessages((prev) => [...prev, tempMessage]);
    setNewMessage("");

    try {
      const res = await ConversationService.sendMessage(messageData);
      if (res?.data?.success) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg._id === tempMessage._id
              ? { ...msg, _id: res.data.messageId, isPending: false }
              : msg
          )
        );
        fetchMessages(conversationId);
      }
    } catch (error) {
      console.error("❌ Lỗi gửi tin nhắn:", error);
    }
  }, [newMessage, conversationId, patientId, fetchMessages]);

  return (
    <CustomModal
      open={open}
      footer={null}
      onCancel={onCancel}
      title="Trò chuyện cùng bác sĩ"
      width={800}
      style={{ top: 20 }}
    >
      <div className="chat-body">
        {loading ? (
          <p>⏳ Đang tải tin nhắn...</p>
        ) : messages.length > 0 ? (
          messages.map((msg) => (
            <div
              key={msg._id}
              className={`message ${msg.senderType === "Patient" ? "patient" : "doctor"}`}
            >
              <p>{msg.content}</p>
              <small className="message-time">
                {msg.createdAt
                  ? format(new Date(msg.createdAt), "HH:mm - dd/MM/yyyy")
                  : "Đang gửi..."}
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
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
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
