import React, { useEffect, useState,useRef } from "react";
import { Input, Button, message, Spin } from "antd";
import { SendOutlined } from "@ant-design/icons";
import ConversationService from "../../../services/ConversationServices";
import { useSelector } from "react-redux";
import moment from "moment";
import "./ChatPatient.css"; // Import file CSS

const { TextArea } = Input;

const ChatPatient = () => {
  const user = useSelector((state) => state.auth.user); 
  const doctorId = user?.id || null; 
  const [conversations, setConversations] = useState([]); 
  const [selectedConversation, setSelectedConversation] = useState(null); 
  const [messages, setMessages] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [newMessage, setNewMessage] = useState(""); 
  const messagesEndRef = useRef(null);
  useEffect(() => {
    console.log("📥 Tin nhắn nhận được từ API:", messages);
    // Tự động cuộn xuống khi có tin nhắn mới
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  useEffect(() => {
    const fetchConversations = async () => {
      console.log("🔍 Bắt đầu gọi API để lấy danh sách cuộc trò chuyện...");

      try {
        if (!doctorId) {
          console.warn("⚠ Không có doctorId, không gọi API");
          return;
        }

        console.log("🆔 Doctor ID hiện tại:", doctorId);
        const response = await ConversationService.getDoctorConversations(
          doctorId
        );

        console.log("✅ API Response:", response);
        let conversationsData = response.data;

        if (!Array.isArray(conversationsData)) {
          console.warn(
            "⚠ Dữ liệu từ API không phải là mảng, tự động chuyển đổi"
          );
          conversationsData = [conversationsData];
        }

        if (conversationsData.length === 0) {
          console.warn("⚠ Danh sách cuộc trò chuyện trống.");
          setConversations([]);
          return;
        }

        console.log("🎯 Danh sách cuộc trò chuyện đã lấy:", conversationsData);
        setConversations([...conversationsData]);
      } catch (error) {
        console.error("🚨 Lỗi khi lấy danh sách cuộc trò chuyện:", error);
        setConversations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, [doctorId]);

  useEffect(() => {
    console.log("📢 Cập nhật state conversations:", conversations);
  }, [conversations]);

  const openConversation = async (conversation) => {
    setSelectedConversation(conversation);
    setLoading(true);

    try {
      console.log("🗨 Đang lấy tin nhắn của cuộc trò chuyện:", conversation._id);

      if (
        typeof ConversationService.getMessagesByConversationId !== "function"
      ) {
        console.error(
          "❌ Lỗi: `getMessagesByConversationId` không phải là một function. Kiểm tra `ConversationService.js`."
        );
        return;
      }

      const response = await ConversationService.getMessagesByConversationId(
        conversation._id
      );

      if (response && response.data) {
        console.log("✅ Tin nhắn nhận được:", response.data);
        setMessages(response.data);
      } else {
        console.warn("⚠ API trả về dữ liệu rỗng.");
        setMessages([]);
      }
    } catch (error) {
      console.error("🚨 Lỗi khi lấy tin nhắn:", error);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
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
      const response = await ConversationService.sendMessage({
        conversationId: selectedConversation._id,
        senderId: doctorId,
        senderType: "Doctor",
        content: newMessage,
      });

      console.log("✅ Tin nhắn đã gửi:", response.data);

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          senderId: doctorId,
          senderType: "Doctor",
          senderName: "Bạn",
          content: newMessage,
          createdAt: new Date(),
        },
      ]);

      setNewMessage(""); 
    } catch (error) {
      message.error("Lỗi khi gửi tin nhắn.");
    } finally {
      setSending(false);
    }
  };

  console.log("📋 Danh sách cuộc trò chuyện:", conversations);
  
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
              className={`chat-item ${
                selectedConversation?._id === conv._id ? "active" : ""
              }`}
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
                messages.map((msg, index) => {
                  console.log("📩 Tin nhắn được render:", msg); 

                  return (
                    <div
                      key={index}
                      className={`message ${
                        msg.senderType &&
                        msg.senderType.toLowerCase() === "doctor"
                          ? "doctor"
                          : "patient"
                      }`}
                    >
                      <p>
                        {msg.content && msg.content.trim()
                          ? msg.content
                          : "⚠ Nội dung tin nhắn không hợp lệ"}
                      </p>
                      <span>
                        {moment(msg.createdAt).format("DD/MM/YYYY HH:mm")}
                      </span>
                    </div >
                  );
                })
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
          <p className="no-chat-selected">
            Chọn một cuộc trò chuyện để xem tin nhắn.
          </p>
        )}
      </div>
    </div>
  );
};

export default ChatPatient;
