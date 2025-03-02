import http from "../../utils/axiosConfigs";
import {
  apiAddMedicalRecord,
  apiGetListMedicalRecordbyDoctorId,
  apiGetMedicalRecordsById,
} from "./urls";

const getMedicalRecordById = (id) =>
  http.get(apiGetMedicalRecordsById.replace(":id", id));
const addMedicalRecord = (body) => http.post(apiAddMedicalRecord, body);
const listMedicalRecordbyDoctorId = (param) =>
  http.get(apiGetListMedicalRecordbyDoctorId.replace(":doctorId", param));

const MedicalRecordServices = {
  getMedicalRecordById,
  addMedicalRecord,
  listMedicalRecordbyDoctorId,
};

export default MedicalRecordServices;
