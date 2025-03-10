import http from "../../utils/axiosConfigs";
import { apiCreateInvoice, apiGetInvoiceById, apiGetInvoicesByAppointmentId } from "./urls";

const getInvoiceById = (id) => http.get(apiGetInvoiceById.replace(":_id", id));
const getInvoicesByAppointmentId = (id) =>
  http.get(apiGetInvoicesByAppointmentId.replace(":appointment", id));
const createInvoice = (body) => http.post(apiCreateInvoice, body);

const InvoiceServices = {
  getInvoiceById,
  getInvoicesByAppointmentId,
  createInvoice,
};

export default InvoiceServices;
