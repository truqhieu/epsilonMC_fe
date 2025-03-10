import http from "../../utils/axiosConfigs";
import {
  apiAddToCart,
  apiGetCart,
  apiUpdateCart,
  apiRemoveCart,
  apiClearCart,
  apiViewCartStaff
} from "./urls";

const CartServices = {
  // Lấy giỏ hàng của tài khoản
  getCart: (data) => http.post(apiGetCart, data),

  // Thêm sản phẩm vào giỏ hàng
  addToCart: (data) => http.post(apiAddToCart, data),

  // Cập nhật giỏ hàng (sử dụng PATCH thay vì PUT)
  updateCart: (data) => http.patch(apiUpdateCart, data),

  // Xóa sản phẩm khỏi giỏ hàng
  removeFromCart: (data) => http.delete(apiRemoveCart, { data }),

  // Xóa toàn bộ giỏ hàng sau khi thanh toán
  clearCart: (data) => http.post(apiClearCart, data),

  viewAllCart: (data) => http.post(apiViewCartStaff, data),
};

export default CartServices;
