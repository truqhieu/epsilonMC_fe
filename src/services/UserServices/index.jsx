import http from "../../utils/axiosConfigs";
import {
  apiCreateUser,
  apiGetUserById,
  apiListUser,
  apiListUserNotAccount,
  apiUpdateUser,
} from "./urls";

const listUserNotAccount = () => http.get(apiListUserNotAccount);
const listUser = (body) => http.post(apiListUser, body);
const updateUser = (body) => http.post(apiUpdateUser, body);
const createUser = (body) => http.post(apiCreateUser, body);
const getUserById = (id) => http.get(apiGetUserById.replace(":_id", id));

export default { listUserNotAccount, listUser, updateUser, createUser, getUserById };
