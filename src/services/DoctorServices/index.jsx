import http from "../../utils/axiosConfigs";
import { apiGetDoctors, apiGetListDoctorsByExam } from "./urls";

const getListDoctorsByExam = (body) => http.post(apiGetListDoctorsByExam, body);
const getDoctors = () => http.get(apiGetDoctors);

const DoctorServices = {
  getListDoctorsByExam,
  getDoctors,
};

export default DoctorServices;
