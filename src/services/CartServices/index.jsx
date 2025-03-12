import http from "../../utils/axiosConfigs";
import {
  apiAddToCart,
  apiGetCart,
  apiUpdateCart,
  apiRemoveCart,
  apiClearCart,
  apiViewCartStaff,
  apiUpdateOrderStatus,
  apiGetPurchaseHistory, // ✅ Thêm API cập nhật trạng thái đơn hàng
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

  // Lấy toàn bộ đơn hàng có trạng thái "Paid" (chỉ Staff mới xem được)
  viewAllCart: (data) => http.post(apiViewCartStaff, data),

  // ✅ Cập nhật trạng thái đơn hàng từ "Paid" → "Shipped"
  updateOrderStatus: (data) => http.patch(apiUpdateOrderStatus, data),
  
  // ✅ Lấy lịch sử mua hàng (chỉ hiển thị đơn "Paid" cho bệnh nhân)
  getPurchaseHistory: (data) => http.post(apiGetPurchaseHistory, data),
};

export default CartServices;
