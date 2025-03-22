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

const getMonthlyAppointmentsByDoctor = async (year) => {
    try {
        const response = await http.get(`${apiGetMonthlyAppointmentsByDoctor}?year=${year}`);
        console.log("📥 Dữ liệu trả về từ API getMonthlyAppointmentsByDoctor:", response);
        return response;  
    } catch (error) {
        console.error("Error in getMonthlyAppointmentsByDoctor:", error);
        throw error;
    }
};

const StatisticService = {
    getAppointmentStatistics,
    getMonthlyAppointmentsByDoctor,
};

export default StatisticService;
