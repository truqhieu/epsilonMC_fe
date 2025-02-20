import http from "../../utils/axiosConfigs";
import { apiGetDoctors } from "./urls";

const getDoctors = async () => {
  try {
    const response = await http.get(apiGetDoctors);


    const doctors = response.data ?? response;

    if (Array.isArray(doctors)) {
      return doctors; 
    } else {
      console.warn("API không trả về mảng hợp lệ:", doctors);
      return [];
    }
  } catch (error) {
    console.error("Lỗi khi gọi API lấy danh sách bác sĩ:", error);
    return [];
  }
};

export default { getDoctors };
