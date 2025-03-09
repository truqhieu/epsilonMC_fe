import http from "../../utils/axiosConfigs";
import {
  apiCreateGuestQuestion,
  apiDoctorAnswerGuestQuestion,
  apiRejectGuestQuestion,
  apiGetPublicApprovedQuestions,
  apiToggleLikeQuestion,
  apiGetDoctorAnsweredQuestions,
  apiGetCommentsByQuestionId,
  apiGetAllGuestQuestionsForDoctors
} from "./urls";


const createGuestQuestion = (body) => http.post(apiCreateGuestQuestion, body);
const doctorAnswerGuestQuestion = (body) => http.put(apiDoctorAnswerGuestQuestion, body);
const rejectGuestQuestion = (body) => http.put(apiRejectGuestQuestion, body);
const getPublicApprovedQuestions = () => http.get(apiGetPublicApprovedQuestions);
const toggleLikeQuestion = (body) => http.post(apiToggleLikeQuestion, body);
const getDoctorAnsweredQuestions = (doctorId) => http.get(`${apiGetDoctorAnsweredQuestions}/${doctorId}`);
const getCommentsByQuestionId = (questionId) => http.get(apiGetCommentsByQuestionId.replace(':questionId', questionId));
const getAllGuestQuestionsForDoctors = (body) => http.get(apiGetAllGuestQuestionsForDoctors);


const QuestionService = {
  createGuestQuestion,
  doctorAnswerGuestQuestion,
  rejectGuestQuestion,
  getPublicApprovedQuestions,
  toggleLikeQuestion,
  getDoctorAnsweredQuestions,
  getCommentsByQuestionId,
  getAllGuestQuestionsForDoctors,
};

export default QuestionService;
