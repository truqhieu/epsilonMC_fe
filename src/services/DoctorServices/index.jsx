import http from "../../utils/axiosConfigs";
import {
  apiGetDoctorById,
  apiGetDoctors,
  apiGetListDoctorActive,
  apiGetListDoctorsByExam,
} from "./urls";

const getListDoctorsByExam = (body) => http.post(apiGetListDoctorsByExam, body);
const getDoctors = () => http.get(apiGetDoctors);
const getDoctorById = (param) => http.get(apiGetDoctorById.replace(":_id", param));
const getDoctorActive = (body) => http.post(apiGetListDoctorActive, body);

const DoctorServices = {
  getListDoctorsByExam,
  getDoctors,
  getDoctorById,
  getDoctorActive,
};

export default DoctorServices;
