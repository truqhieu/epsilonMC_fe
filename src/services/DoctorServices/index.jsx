import http from "../../utils/axiosConfigs";
import {
  apiCreateDoctor,
  apiGetAllDoctor,
  apiGetDoctorById,
  apiGetDoctors,
  apiGetListDoctorActive,
  apiGetListDoctorsByExam,
  apiUpdateDoctor,
} from "./urls";

const getListDoctorsByExam = (body) => http.post(apiGetListDoctorsByExam, body);
const getDoctors = () => http.get(apiGetDoctors);
const getDoctorById = (param) => http.get(apiGetDoctorById.replace(":_id", param));
const getDoctorActive = (body) => http.post(apiGetListDoctorActive, body);
const getAllDoctor = () => http.get(apiGetAllDoctor);
const updateDoctor = (body) => http.post(apiUpdateDoctor, body);
const createDoctor = (body) => http.post(apiCreateDoctor, body);

const DoctorServices = {
  getListDoctorsByExam,
  getDoctors,
  getDoctorById,
  getDoctorActive,
  getAllDoctor,
  updateDoctor,
  createDoctor,
};

export default DoctorServices;
