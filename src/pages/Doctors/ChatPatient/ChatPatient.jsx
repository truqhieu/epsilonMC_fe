// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useRef, useCallback } from "react";
import { Input, Button, message, Spin } from "antd";
import { SendOutlined } from "@ant-design/icons";
import ConversationService from "../../../services/ConversationServices";
import { useSelector } from "react-redux";
import moment from "moment";
import "./ChatPatient.css"; // Import file CSS

const { TextArea } = Input;

const ChatPatient = () => {
  const { user } = useSelector((state) => state.auth);
  const doctorId = user?.id || null;

  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  const messagesEndRef = useRef(null);

  // Cuộn xuống cuối khi tin nhắn thay đổi
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Lấy danh sách cuộc trò chuyện
  useEffect(() => {
    const fetchConversations = async () => {
      if (!doctorId) return;

      setLoading(true);
      try {
        const response = await ConversationService.getDoctorConversations(doctorId);
        let convData = response.data;
        if (!Array.isArray(convData)) convData = [convData];
        setConversations(convData);
      } catch (error) {
        console.error("Error fetching conversations:", error);
        setConversations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, [doctorId]);

  // Lấy tin nhắn của cuộc trò chuyện đang chọn
  const fetchMessages = useCallback(async () => {
    if (!selectedConversation) return;
    try {
      const response = await ConversationService.getMessagesByConversationId(
        selectedConversation._id
      );
      setMessages(response?.data || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
      setMessages([]);
    }
  }, [selectedConversation]);

  // Cập nhật tin nhắn mỗi 15 giây
  useEffect(() => {
    if (!selectedConversation) return;

    fetchMessages(); // Lấy tin nhắn ngay khi chọn cuộc trò chuyện
    const interval = setInterval(fetchMessages, 15000); // 15 giây

    return () => clearInterval(interval); // Xóa interval khi unmount hoặc đổi cuộc trò chuyện
  }, [selectedConversation, fetchMessages]);

  // Mở cuộc trò chuyện
  const openConversation = useCallback((conversation) => {
    setSelectedConversation(conversation);
  }, []);

  // Gửi tin nhắn
  const sendMessage = useCallback(async () => {
    if (!newMessage.trim()) {
      message.warning("Vui lòng nhập nội dung tin nhắn!");
      return;
    }
    if (!selectedConversation) {
      message.error("Không có cuộc trò chuyện được chọn!");
      return;
    }

    setSending(true);
    try {
      const payload = {
        conversationId: selectedConversation._id,
        senderId: doctorId,
        senderType: "Doctor",
        content: newMessage,
      };
      const response = await ConversationService.sendMessage(payload);

      const appendedMessage = {
        ...payload,
        createdAt: new Date(),
        _id: response.data?.messageId || `temp_${Date.now()}`,
        senderName: "Bạn",
      };

      setMessages((prev) => [...prev, appendedMessage]);
      setNewMessage("");
    } catch (error) {
      message.error("Lỗi khi gửi tin nhắn.");
      console.error("Send message error:", error);
    } finally {
      setSending(false);
    }
  }, [newMessage, selectedConversation, doctorId]);

  return (
    <div className="chat-container">
      <div className="chat-sidebar">
        <h3>Cuộc trò chuyện</h3>
        {loading ? (
          <Spin />
        ) : conversations.length > 0 ? (
          conversations.map((conv) => (
            <div
              key={conv._id}
              className={`chat-item ${selectedConversation?._id === conv._id ? "active" : ""}`}
              onClick={() => openConversation(conv)}
            >
              {conv.patientName}
            </div>
          ))
        ) : (
          <p>Không có cuộc trò chuyện nào.</p>
        )}
      </div>
      <div className="chat-content">
        {selectedConversation ? (
          <>
            <h3>{selectedConversation.patientName}</h3>
            <div className="messages">
              {messages.length > 0 ? (
                messages.map((msg) => (
                  <div
                    key={msg._id || `${msg.createdAt}-${Math.random()}`}
                    className={`message ${
                      msg.senderType?.toLowerCase() === "doctor" ? "doctor" : "patient"
                    }`}
                  >
                    <p>{msg.content?.trim() ? msg.content : "⚠ Nội dung tin nhắn không hợp lệ"}</p>
                    <span>{moment(msg.createdAt).format("DD/MM/YYYY HH:mm")}</span>
                  </div>
                ))
              ) : (
                <p className="no-messages">Chưa có tin nhắn.</p>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="message-input">
              <TextArea
                rows={2}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Nhập tin nhắn..."
              />
              <Button
                type="primary"
                icon={<SendOutlined />}
                loading={sending}
                onClick={sendMessage}
              >
                Gửi
              </Button>
            </div>
          </>
        ) : (
          <p className="no-chat-selected">Chọn một cuộc trò chuyện để xem tin nhắn.</p>
        )}
      </div>
    </div>
  );
};

export default ChatPatient;
