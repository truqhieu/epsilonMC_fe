import http from "../../utils/axiosConfigs";
import { apiGetApprovedQuestions, apiCreateQuestion } from "./urls";

const getApprovedQuestions = () => http.get(apiGetApprovedQuestions);
const createQuestion = (body) => http.post(apiCreateQuestion, body);

const QuestionService = { getApprovedQuestions, createQuestion };

export default QuestionService;
