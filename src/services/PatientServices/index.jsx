import http from "../../utils/axiosConfigs";
import { apiGetPatientById } from "./urls";

const getPatientById = (param) => http.get(apiGetPatientById.replace(":_id", param));

export default { getPatientById };
