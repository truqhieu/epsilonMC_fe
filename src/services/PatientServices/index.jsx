import http from "../../utils/axiosConfigs";
import {
  apiGetAllPatients,
  apiGetPatientById,
  apiUpdateDoctorForPatient,
  apiUpdatedPatient,
} from "./urls";

const getPatientById = (param) => http.get(apiGetPatientById.replace(":_id", param));
const updateDoctorForPatient = (body) => http.put(apiUpdateDoctorForPatient, body);
const getAllPatients = (body) => http.post(apiGetAllPatients, body);
const updatePatient = (body) => http.post(apiUpdatedPatient, body);

const PatientServices = {
  getPatientById,
  updateDoctorForPatient,
  getAllPatients,
  updatePatient,
};

export default PatientServices;
