import http from "../../utils/axiosConfigs";
import { apiLoginStaff, apiLoginPatient, apiRefresh } from "./urls";

const loginStaff = (body) => http.post(apiLoginStaff, body);
const loginPatient = (body) => http.post(apiLoginPatient, body);
const refresh = () => http.post(apiRefresh, {}, { withCredentials: true });

const AuthServices = { loginStaff, loginPatient, refresh };

export default AuthServices;
