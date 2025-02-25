import http from "../../utils/axiosConfigs";
import { apiGetListDoctorsByExam } from "./urls";

const getListDoctorsByExam = (body) => http.post(apiGetListDoctorsByExam, body);

const DoctorServices = {
  getListDoctorsByExam,
};

export default DoctorServices;
