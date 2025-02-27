import http from "../../utils/axiosConfigs";
import {
  apiGetAllQuestions,
  apiGetPatientQuestions,
  apiGetApprovedQuestions,
  apiGetCommentsByQuestionId,
  apiCreateQuestion,
  apiDoctorAnswerQuestion,
  apiDoctorCommentOnQuestion,
  apiPatientCommentOnQuestion,
  apiRejectQuestion,
  apiToggleLike,
} from "./urls";

const getAllQuestions = () => http.get(apiGetAllQuestions);
const getPatientQuestions = (patientId) => http.get(`${apiGetPatientQuestions}/${patientId}`);
const getApprovedQuestions = () => http.get(apiGetApprovedQuestions);
const getCommentsByQuestionId = (questionId) => http.get(`${apiGetCommentsByQuestionId}/${questionId}`);
const createQuestion = (body) => http.post(apiCreateQuestion, body);
const doctorAnswerQuestion = (body) => http.put(apiDoctorAnswerQuestion, body);
const doctorCommentOnQuestion = (body) => http.post(apiDoctorCommentOnQuestion, body);
const patientCommentOnQuestion = (body) => http.post(apiPatientCommentOnQuestion, body);
const rejectQuestion = (body) => http.put(apiRejectQuestion, body);
const toggleLike = (body) => http.post(apiToggleLike, body);

const CommunityService = {
  getAllQuestions,
  getPatientQuestions,
  getApprovedQuestions,
  getCommentsByQuestionId,
  createQuestion,
  doctorAnswerQuestion,
  doctorCommentOnQuestion,
  patientCommentOnQuestion,
  rejectQuestion,
  toggleLike,
};

export default CommunityService;
