import http from "../../utils/axiosConfigs";
import { apiGetInvoiceById } from "./urls";

const getInvoiceById = (id) => http.get(apiGetInvoiceById.replace(":_id", id));

const InvoiceServices = {
  getInvoiceById,
};

export default InvoiceServices;
