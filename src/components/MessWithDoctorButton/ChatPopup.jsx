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

  const loadConversation = useCallback(async () => {
    if (!patientId) return;

    try {
      setLoading(true);
      const res = await ConversationService.getPatientConversations(patientId);
      const conversations = res?.data?.data || res?.data || [];

      if (conversations.length > 0) {
        const conversation = conversations[0];
        setConversationId(conversation._id);
        if (Array.isArray(conversation.messages)) {
          setMessages(conversation.messages);
        } else {
          const msgRes = await ConversationService.getMessagesByConversationId(conversation._id);
          const fetchedMessages = msgRes?.data?.messages || msgRes?.data?.data?.messages || [];
          setMessages(Array.isArray(fetchedMessages) ? fetchedMessages : []);
        }
      } else {
        // Create a new conversation if none exists
        const newConv = await ConversationService.createConversation({ patientId });
        if (newConv?.data?.success && newConv?.data?.conversationId) {
          setConversationId(newConv.data.conversationId);
          setMessages([]);
        } else {
          console.error("Unable to create a new conversation.");
        }
      }
    } catch (error) {
      console.error("Error loading conversation:", error);
    } finally {
      setLoading(false);
    }
  }, [patientId]);

  useEffect(() => {
    if (open) {
      loadConversation();
    }
  }, [open, loadConversation]);

  useEffect(() => {
    if (open && patientId) {
      const interval = setInterval(() => loadConversation(), 15000); // 15 seconds
      return () => clearInterval(interval);
    }
  }, [open, patientId, loadConversation]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
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

    const tempMessage = {
      ...messageData,
      _id: `temp_${Date.now()}`,
      isPending: true,
    };
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
      } else {
        console.error("Message sending failed");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }, [newMessage, conversationId, patientId]);

  return (
    <CustomModal
      open={open}
      footer={null}
      onCancel={onCancel}
      title="Trò chuyện cùng bác sĩ"
      width={800}
      style={{ top: 20 }}
    >
      <div className="chat-container-wrapper">
        <div className="chat-body">
          {loading === true && <div className="loading">Đang tải...</div>}
          {messages.map((msg) => (
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
          ))}
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
      </div>
    </CustomModal>
  );
};

ChatPopup.propTypes = {
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ChatPopup;
