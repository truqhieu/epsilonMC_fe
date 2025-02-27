import http from "../../utils/axiosConfigs";
import { apiMedicalRecords } from "./urls";

const getMedicalRecordByPatientId = (patientId) => 
  http.get(apiMedicalRecords.replace(":patientId", patientId));

const MedicalRecordServices = {
  getMedicalRecordByPatientId,
};

export default MedicalRecordServices;
