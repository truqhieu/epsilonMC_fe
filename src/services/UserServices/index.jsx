import http from "../../utils/axiosConfigs";
import { apiGetDoctors } from "./urls";

const getDoctors = async () => {
  try {
    const response = await http.get(apiGetDoctors);
    return response.data; // Đã có `success` và `data`
  } catch (error) {
    console.error("Lỗi khi gọi API lấy danh sách bác sĩ:", error);
    return { success: false, data: [] };
  }
};

export default { getDoctors };
