import http from "../../utils/axiosConfigs";
import {
  apiAddAppointment,
  apiGetAppointmentById,
  apiListAppointment,
  apiSendMailApproved,
  apiSendMailRejected,
  apiUpdateAppointment,
  apiAppointmentListDoctor,
} from "./urls";

const addAppointment = (body) => http.post(apiAddAppointment, body);
const listAppointment = (body) => http.post(apiListAppointment, body);
const getAppointmentById = (id) =>
  http.post(apiGetAppointmentById.replace(":id", id));
const updateAppointment = (id, body) =>
  http.post(apiUpdateAppointment.replace(":id", id), body);
const sendMailRejected = (body) => http.post(apiSendMailRejected, body);
const sendMailApproved = (body) => http.post(apiSendMailApproved, body);
const listAppointmentDoctor = (doctorId) =>
  http.get(apiAppointmentListDoctor.replace(":doctorId", doctorId));

const AppointmentServices = {
  addAppointment,
  listAppointment,
  getAppointmentById,
  updateAppointment,
  sendMailRejected,
  sendMailApproved,
  listAppointmentDoctor,
};

export default AppointmentServices;