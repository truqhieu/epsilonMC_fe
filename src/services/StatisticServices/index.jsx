import http from "../../utils/axiosConfigs";
import { apiGetAppointmentStats, apiGetMonthlyAppointmentsByDoctor } from "./urls";

const getAppointmentStatistics = async () => {
    try {
        const response = await http.get(apiGetAppointmentStats);
        console.log("📥 Dữ liệu trả về từ API getAppointmentStatistics:", response);
        return response;  
    } catch (error) {
        console.error("Error in getAppointmentStatistics:", error);
        throw error;
    }
};

const getMonthlyAppointmentsByDoctor = async (year) => http.get(`${apiGetMonthlyAppointmentsByDoctor}?year=${year}`);


const StatisticService = {
    getAppointmentStatistics,
    getMonthlyAppointmentsByDoctor,
};

export default StatisticService;
