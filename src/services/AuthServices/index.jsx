import http from "../../utils/axiosConfigs";
import { apiLogin } from "./urls";

const login = (body) => http.post(apiLogin, body);

const AuthServices = { login };

export default AuthServices;
