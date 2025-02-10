import http from "../../utils/axiosConfigs";
import {
  apiLoginStaff,
  apiLoginPatient,
  apiRefresh,
  apiSendOTP,
  apiVerifyOTP,
} from "./urls";

const loginStaff = (body) => http.post(apiLoginStaff, body);
const loginPatient = (body) => http.post(apiLoginPatient, body);
const refresh = () => http.post(apiRefresh, {}, { withCredentials: true });
const sendOTP = (body) => http.post(apiSendOTP, body);
const verifyOTP = (body) => http.post(apiVerifyOTP, body);

const AuthServices = { loginStaff, loginPatient, refresh, sendOTP, verifyOTP };

export default AuthServices;
