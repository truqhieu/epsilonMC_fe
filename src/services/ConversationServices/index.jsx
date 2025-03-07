import http from "../../utils/axiosConfigs";
import {
  apiStartConversation,
  apiSendMessage,
  apiGetPatientConversations,
  apiGetDoctorConversations,
  apiGetMessagesByConversationId,
  apiLockConversation
} from "./urls";

// Bắt đầu cuộc trò chuyện giữa bệnh nhân và bác sĩ
const startConversation = (body) => http.post(apiStartConversation, body);

// Gửi tin nhắn trong cuộc trò chuyện
const sendMessage = (body) => http.post(apiSendMessage, body);

// Lấy danh sách cuộc trò chuyện của bệnh nhân
const getPatientConversations = (patientId) => http.get(`${apiGetPatientConversations}/${patientId}`);

// Lấy danh sách cuộc trò chuyện của bác sĩ
const getDoctorConversations = (doctorId) => http.get(`${apiGetDoctorConversations}/${doctorId}`);

// Lấy tin nhắn trong một cuộc trò chuyện
const getMessagesByConversationId = (conversationId) => http.get(apiGetMessagesByConversationId.replace(":conversationId", conversationId));

// Khóa cuộc trò chuyện khi bác sĩ nghỉ việc hoặc không hoạt động
const lockConversation = (body) => http.put(apiLockConversation, body);

const ConversationService = {
  startConversation,
  sendMessage,
  getPatientConversations,
  getDoctorConversations,
  getMessagesByConversationId,
  lockConversation
};

export default ConversationService;
