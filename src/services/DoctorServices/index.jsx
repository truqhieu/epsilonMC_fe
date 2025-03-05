import http from "../../utils/axiosConfigs";
import { apiGetDoctorById, apiGetDoctors, apiGetListDoctorsByExam } from "./urls";

const getListDoctorsByExam = (body) => http.post(apiGetListDoctorsByExam, body);
const getDoctors = () => http.get(apiGetDoctors);
const getDoctorById = (param) => http.get(apiGetDoctorById.replace(":_id", param));

const DoctorServices = {
  getListDoctorsByExam,
  getDoctors,
  getDoctorById,
};

export default DoctorServices;
