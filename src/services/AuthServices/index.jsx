import http from "../../utils/axiosConfigs";
import {
  apiLoginStaff,
  apiLoginPatient,
  apiRefresh,
  apiSendOTP,
  apiVerifyOTP,
  apiLogout,
  apiRegister,
  apiGetAllAccount,
} from "./urls";

const loginStaff = (body) => http.post(apiLoginStaff, body);
const loginPatient = (body) => http.post(apiLoginPatient, body);
const logout = () => http.post(apiLogout, {}, { withCredentials: true });
const refresh = () => http.post(apiRefresh, {}, { withCredentials: true });
const sendOTP = (body) => http.post(apiSendOTP, body);
const verifyOTP = (body) => http.post(apiVerifyOTP, body);
const register = (body) => http.post(apiRegister, body);
const getAllAccount = (body) => http.post(apiGetAllAccount, body);

const AuthServices = {
  loginStaff,
  loginPatient,
  refresh,
  sendOTP,
  verifyOTP,
  logout,
  register,
  getAllAccount,
};

export default AuthServices;
