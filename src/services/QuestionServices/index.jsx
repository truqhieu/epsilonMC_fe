import http from "../../utils/axiosConfigs";
import {
  apiCreateGuestQuestion,
  apiCreatePatientQuestion,
  apiDoctorAnswerGuestQuestion,
  apiRejectGuestQuestion,
  apiGetPublicApprovedQuestions,
  apiGetPatientQuestions,
  apiToggleLikeQuestion,
  apiGetDoctorAnsweredQuestions,
  apiGetCommentsByQuestionId
} from "./urls";


const createGuestQuestion = (body) => http.post(apiCreateGuestQuestion, body);
const createPatientQuestion = (body) => http.post(apiCreatePatientQuestion, body);
const doctorAnswerGuestQuestion = (body) => http.put(apiDoctorAnswerGuestQuestion, body);
const rejectGuestQuestion = (body) => http.put(apiRejectGuestQuestion, body);
const getPublicApprovedQuestions = () => http.get(apiGetPublicApprovedQuestions);
const getPatientQuestions = (patientId) => http.get(`${apiGetPatientQuestions}/${patientId}`);
const toggleLikeQuestion = (body) => http.post(apiToggleLikeQuestion, body);
const getDoctorAnsweredQuestions = (doctorId) => http.get(`${apiGetDoctorAnsweredQuestions}/${doctorId}`);
const getCommentsByQuestionId = (questionId) => http.get(apiGetCommentsByQuestionId.replace(':questionId', questionId));



const QuestionService = {
  createGuestQuestion,
  createPatientQuestion,
  doctorAnswerGuestQuestion,
  rejectGuestQuestion,
  getPublicApprovedQuestions,
  getPatientQuestions,
  toggleLikeQuestion,
  getDoctorAnsweredQuestions,
  getCommentsByQuestionId
};

export default QuestionService;
