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
  const hasFetched = useRef(false); 

  useEffect(() => {
    if (open && patientId) {
      setLoading(true);
      checkAndStartConversation();
      const fetchConversations = async () => {
        try {
          const res = await ConversationService.getPatientConversations(
            patientId
          );
          let conversations = res?.data?.data || [];

          if (conversations.length > 0) {
            const conversation = conversations[0];
            setConversationId(conversation._id);
            await fetchMessages(conversation._id);
          } else {
            const newConv = await ConversationService.checkAndStartConversation(
              patientId
            );
            if (newConv?.success && newConv?.data) {
              setConversationId(newConv.data._id);
              setMessages([]);
            }
          }
        } catch (error) {
          console.error("❌ Lỗi lấy cuộc trò chuyện:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchConversations();
    }
  }, [open, patientId]);
  const checkAndStartConversation = async () => {
    console.log("📡 [CHECK] Kiểm tra cuộc trò chuyện");

    try {
      const res = await ConversationService.getPatientConversations(patientId);
      console.log("📥 [API RESPONSE] Conversations:", res?.data);

      let conversations = res?.data?.data || res?.data;
      if (Array.isArray(conversations) && conversations.length > 0) {
        const conversation = conversations[0];
        setConversationId(conversation._id);
        console.log("✅ [CONVERSATION FOUND] ID:", conversation._id);
        fetchMessages(conversation._id);
      } else {
        console.warn(
          "⚠️ [NO CONVERSATION] Không có cuộc trò chuyện nào, tạo mới..."
        );
        startNewConversation();
      }
    } catch (error) {
      console.error("❌ [ERROR] Lỗi lấy cuộc trò chuyện:", error);
    }
  };

  const startNewConversation = async () => {
    try {
      const res = await ConversationService.createConversation({ patientId });
      console.log("📥 [API RESPONSE] Create conversation:", res?.data);

      if (res?.data?.success) {
        const newConvId = res.data.conversationId;
        console.log("✅ [NEW CONVERSATION] Created ID:", newConvId);
        setConversationId(newConvId);
        fetchMessages(newConvId); // 🔥 GỌI NGAY SAU KHI TẠO
      } else {
        console.error("❌ [ERROR] Không thể tạo cuộc trò chuyện mới");
      }
    } catch (error) {
      console.error("❌ [ERROR] Lỗi khi tạo cuộc trò chuyện:", error);
    }
  };

  const fetchConversations = async () => {
    try {
      const res = await ConversationService.getPatientConversations(patientId);
      console.log("🔥 API response - Conversations:", res.data);

      const conversations = Array.isArray(res.data?.data)
        ? res.data.data
        : Array.isArray(res.data)
        ? res.data
        : [];

      if (conversations.length > 0) {
        const conversation = conversations[0];
        setConversationId(conversation._id);
        await new Promise((resolve) => setTimeout(resolve, 100)); 

        if (Array.isArray(conversation.messages)) {
          setMessages(conversation.messages);
        } else {
          const msgRes = await ConversationService.getMessagesByConversationId(
            conversation._id
          );
          console.log("🔥 API response - Messages:", msgRes.data);

          const fetchedMessages =
            msgRes?.data?.messages || msgRes?.data?.data?.messages || [];
          setMessages(Array.isArray(fetchedMessages) ? fetchedMessages : []);
        }
      } else {
        setMessages([]);
      }
    } catch (error) {
      console.error("❌ Lỗi lấy cuộc trò chuyện:", error);
    }
  };

  fetchConversations();

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
        fetchMessages(conversationId);
      } else {
        console.error("❌ Gửi tin nhắn thất bại");
      }
    } catch (error) {
      console.error("❌ Lỗi gửi tin nhắn:", error);
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
      <div className="chat-body">
        {loading ? (
          <p>⏳ Đang tải tin nhắn...</p>
        ) : messages.length > 0 ? (
          messages.map((msg) => (
            <div
              key={msg._id}
              className={`message ${
                msg.senderType === "Patient" ? "patient" : "doctor"
              }`}
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
