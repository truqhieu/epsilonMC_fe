import http from "../../utils/axiosConfigs";
import { apiListExam } from "./urls";

const listExam = () => http.get(apiListExam);

const ExamServices = {
  listExam,
};

export default ExamServices;
