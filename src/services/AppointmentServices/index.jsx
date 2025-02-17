import http from "../../utils/axiosConfigs";
import { apiAddAppointment } from "./urls";

const addAppointment = (body) => http.post(apiAddAppointment, body);

const AppointmentServices = { addAppointment };

export default AppointmentServices;
