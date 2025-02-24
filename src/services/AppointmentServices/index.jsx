import http from "../../utils/axiosConfigs";
import {
  apiAddAppointment,
  apiGetAppointmentById,
  apiListAppointment,
} from "./urls";

const addAppointment = (body) => http.post(apiAddAppointment, body);
const listAppointment = (body) => http.post(apiListAppointment, body);
const getAppointmentById = (id) =>
  http.post(apiGetAppointmentById.replace(":id", id));

const AppointmentServices = {
  addAppointment,
  listAppointment,
  getAppointmentById,
};

export default AppointmentServices;
