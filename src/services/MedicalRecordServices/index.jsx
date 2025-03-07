import http from "../../utils/axiosConfigs";
import {
  apiAddMedicalRecord,
  apiGetListMedicalRecordByAppointment,
  apiGetListMedicalRecordbyDoctorId,
  apiGetListMedicalRecordbyPatientId,
  apiGetMedicalRecordsById,
} from "./urls";

const getMedicalRecordById = (id) => http.get(apiGetMedicalRecordsById.replace(":id", id));
const addMedicalRecord = (body) => http.post(apiAddMedicalRecord, body);
const listMedicalRecordbyDoctorId = (param) =>
  http.get(apiGetListMedicalRecordbyDoctorId.replace(":doctorId", param));
const listMedicalRecordbyPatientId = (param) =>
  http.get(apiGetListMedicalRecordbyPatientId.replace(":patientId", param));
const getListMedicalRecordByAppointment = (param) =>
  http.get(apiGetListMedicalRecordByAppointment.replace(":appointmentId", param));

const MedicalRecordServices = {
  getMedicalRecordById,
  addMedicalRecord,
  listMedicalRecordbyDoctorId,
  listMedicalRecordbyPatientId,
  getListMedicalRecordByAppointment,
};

export default MedicalRecordServices;
