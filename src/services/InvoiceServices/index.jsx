import http from "../../utils/axiosConfigs";
import { apiGetInvoiceById, apiGetInvoicesByAppointmentId } from "./urls";

const getInvoiceById = (id) => http.get(apiGetInvoiceById.replace(":_id", id));
const getInvoicesByAppointmentId = (id) =>
  http.get(apiGetInvoicesByAppointmentId.replace(":appointment", id));

const InvoiceServices = {
  getInvoiceById,
  getInvoicesByAppointmentId,
};

export default InvoiceServices;
