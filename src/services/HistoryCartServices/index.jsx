import http from "../../utils/axiosConfigs";
import { apiGetHistoryCart } from "./urls";

const getHistoryCart = (accountId) => http.post(apiGetHistoryCart, { accountId });

const HistoryCartServices = {
  getHistoryCart,
};

export default HistoryCartServices;
