import http from "../../utils/axiosConfigs";
import { apiListExam } from "./urls";

const listExam = (examinationType) =>
  http.get(apiListExam.replace(":examinationType", examinationType));

const ExamServices = {
  listExam,
};

export default ExamServices;
