import http from "../../utils/axiosConfigs";
import { apiGetDetailedRevenueStats,apiGetDoctorAppointmentRevenueStats } from "./urls";


const getDetailedRevenueStatistics = async (accountId, startDate, endDate) => {
    try {
        const params = {
            accountId,
            startDate: startDate ? startDate.format('YYYY-MM-DD') : null,
            endDate: endDate ? endDate.format('YYYY-MM-DD') : null
        };

        console.log('Sending request to:', apiGetDetailedRevenueStats, 'with params:', params);

        const response = await http.post(apiGetDetailedRevenueStats, params);
        
        console.log('Raw API response:', response);

        // Kiểm tra response theo cấu trúc từ backend
        if (!response || !response.data) {
            throw new Error("Không nhận được phản hồi từ server");
        }

        // Nếu response.data đã chứa success và data
        if (response.data.success !== false && response.data.data) {
            return {
                success: true,
                data: response.data.data
            };
        }

        // Nếu response.data có cấu trúc trực tiếp
        if (response.data.totalRevenue !== undefined && response.data.orders !== undefined) {
            return {
                success: true,
                data: response.data
            };
        }

        throw new Error(response.data.message || "Dữ liệu trả về không hợp lệ");
    } catch (error) {
        console.error("Error in getDetailedRevenueStatistics:", error);
        throw error;
    }
};
const getDoctorAppointmentRevenueStatistics = async (accountId, startDate, endDate) => {
    try {
        // Chuẩn bị params với kiểm tra hợp lệ
        const params = {
            accountId,
            startDate: startDate ? startDate.format('YYYY-MM-DD') : null,
            endDate: endDate ? endDate.format('YYYY-MM-DD') : null
        };

        // Log request để debug
        console.log('Requesting doctor revenue stats to:', apiGetDoctorAppointmentRevenueStats, 'with params:', params);

        // Gọi API
        const response = await http.post(apiGetDoctorAppointmentRevenueStats, params);
        
        console.log('Raw API response:', response);

        // Kiểm tra response tổng quát
        if (!response || !response.data) {
            throw new Error("Không nhận được phản hồi từ server");
        }

        // Xử lý response theo 2 trường hợp:
        // 1. Response có cấu trúc {success, data, message}
        if (response.data.success !== false && response.data.data) {
            return {
                success: true,
                data: response.data.data,
                message: response.data.message || "Thống kê thành công"
            };
        }

        // 2. Response có cấu trúc trực tiếp {summary, doctors}
        if (response.data.summary && Array.isArray(response.data.doctors)) {
            return {
                success: true,
                data: response.data,
                message: "Thống kê thành công"
            };
        }

        // Nếu không khớp với các định dạng trên
        throw new Error(response.data.message || "Dữ liệu trả về không đúng định dạng");

    } catch (error) {
        console.error("Error in getDoctorAppointmentRevenueStatistics:", {
            error: error.message,
            stack: error.stack
        });
        
        // Cải thiện thông báo lỗi
        const errorMessage = error.response?.data?.message 
            || error.message 
            || "Lỗi khi lấy thống kê doanh thu";
            
        throw new Error(errorMessage);
    }
};

const StatisticServices = {
    getDetailedRevenueStatistics,
    getDoctorAppointmentRevenueStatistics
};

export default StatisticServices;