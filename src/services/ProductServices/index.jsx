import http from "../../utils/axiosConfigs";
import { apiGetAllProducts, apiGetProductDetail } from "./urls";

const getAllProducts = () => {
  return http.get(apiGetAllProducts);
};

const getProductDetail = (productId) => {
  return http.get(`${apiGetProductDetail.replace(":productId", productId)}`);
};

const ProductServices = {
  getAllProducts,
  getProductDetail,
};

export default ProductServices;