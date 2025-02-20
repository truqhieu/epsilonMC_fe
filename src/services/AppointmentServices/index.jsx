import http from "../../utils/axiosConfigs";
import { apiAddAppointment, apiListAppointment } from "./urls";

const addAppointment = (body) => http.post(apiAddAppointment, body);
const listAppointment = (body) => http.post(apiListAppointment, body);

const AppointmentServices = { addAppointment, listAppointment };

export default AppointmentServices;
