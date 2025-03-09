import http from "../../utils/axiosConfigs";
import {
  apiAddToCart,
  apiGetCart,
  apiUpdateCart,
  apiRemoveCart,
  apiClearCart
} from "./urls";

const CartServices = {
  // Lấy giỏ hàng (sử dụng POST thay vì GET, truyền accountId trong body)
  getCart: (data) => http.post(apiGetCart, data),  

  // Thêm sản phẩm vào giỏ hàng
  addToCart: (data) => http.post(apiAddToCart, data),

  // Cập nhật số lượng sản phẩm trong giỏ hàng (sử dụng PATCH thay vì PUT)
  updateCart: (data) => http.patch(apiUpdateCart, data),

  // Xóa sản phẩm khỏi giỏ hàng (DELETE, truyền productId trong body)
  removeFromCart: (data) => http.delete(apiRemoveCart, { data }),
  clearCart: (data) => http.post(apiClearCart, data), // Thêm API clearCart

};

export default CartServices;
