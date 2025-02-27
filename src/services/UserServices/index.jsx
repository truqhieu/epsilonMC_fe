import http from "../../utils/axiosConfigs";
import { apiListUserNotAccount } from "./urls";

const listUserNotAccount = () => http.get(apiListUserNotAccount);

export default { listUserNotAccount };
