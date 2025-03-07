import http from "../../utils/axiosConfigs";
import { apiGetPatientById, apiUpdateDoctorForPatient } from "./urls";

const getPatientById = (param) => http.get(apiGetPatientById.replace(":_id", param));
const updateDoctorForPatient = (body) => http.put(apiUpdateDoctorForPatient, body);

const PatientServices = {
  getPatientById,
  updateDoctorForPatient,
};

export default PatientServices;
