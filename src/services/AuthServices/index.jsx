import http from "../../utils/axiosConfigs";
import { apiLoginStaff, apiLoginPatient } from "./urls";

const loginStaff = (body) => http.post(apiLoginStaff, body);
const loginPatient = (body) => http.post(apiLoginPatient, body);

const AuthServices = { loginStaff, loginPatient };

export default AuthServices;
