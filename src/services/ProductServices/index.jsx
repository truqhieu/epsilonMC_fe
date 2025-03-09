// ProductServices.js
import http from "../../utils/axiosConfigs"; // Import Axios instance
import { apiGetAllProducts, apiGetDetailProducts } from "./urls"; // Import API endpoints

// Hàm lấy danh sách tất cả sản phẩm
const getAllProducts = () => {
  return http.get(apiGetAllProducts);
};

// Hàm lấy thông tin chi tiết sản phẩm bằng phương thức GET
const getProductDetail = async (productId) => {
  try {
    const response = await http.get(`${apiGetDetailProducts}/${productId}`); // Gọi API với productId
    console.log("API Response:", response.data); // Kiểm tra phản hồi từ API
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error; // Ném lỗi để xử lý ở nơi gọi hàm
  }
};

// Đối tượng chứa các hàm service
const ProductServices = {
  getAllProducts,
  getProductDetail,
};

export default ProductServices;