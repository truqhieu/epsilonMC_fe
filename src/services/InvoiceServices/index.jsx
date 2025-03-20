import http from "../../utils/axiosConfigs";
import {
  apiCreateInvoice,
  apiGetInvoiceById,
  apiGetInvoicesByAppointmentId,
  apiUpdateInvoice,
} from "./urls";

const getInvoiceById = (id) => http.get(apiGetInvoiceById.replace(":_id", id));
const getInvoicesByAppointmentId = (id) =>
  http.get(apiGetInvoicesByAppointmentId.replace(":appointment", id));
const createInvoice = (body) => http.post(apiCreateInvoice, body);
const updateInvoice = (body) => http.post(apiUpdateInvoice, body);

const InvoiceServices = {
  getInvoiceById,
  getInvoicesByAppointmentId,
  createInvoice,
  updateInvoice,
};

export default InvoiceServices;
