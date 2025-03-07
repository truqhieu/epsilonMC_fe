
import http from "../../utils/axiosConfigs";
import { apiGetAllProducts } from "./urls";
const getAllProducts = () => {
    console.log("Gọi API với URL:", http.defaults.baseURL + apiGetAllProducts);
    return http.get(apiGetAllProducts);
};

const ProductServices = {
    getAllProducts,
};

export default ProductServices;