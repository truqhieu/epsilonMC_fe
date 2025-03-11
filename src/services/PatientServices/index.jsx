import http from "../../utils/axiosConfigs";
import { apiGetAllPatients, apiGetPatientById, apiUpdateDoctorForPatient } from "./urls";

const getPatientById = (param) => http.get(apiGetPatientById.replace(":_id", param));
const updateDoctorForPatient = (body) => http.put(apiUpdateDoctorForPatient, body);
const getAllPatients = (body) => http.post(apiGetAllPatients, body);

const PatientServices = {
  getPatientById,
  updateDoctorForPatient,
  getAllPatients,
};

export default PatientServices;
