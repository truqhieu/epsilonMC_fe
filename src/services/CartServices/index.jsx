import http from "../../utils/axiosConfigs";
import {
  apiAddToCart,
  apiGetCart,
  apiUpdateCart,
  apiRemoveCart,
  apiClearCart,
  apiViewCartStaff,
  apiUpdateOrderStatus,
  apiGetPurchaseHistory,
  apiVerifyPayment,
} from "./urls";

const CartServices = {
  getCart: (data) => http.post(apiGetCart, data),

  addToCart: (data) => http.post(apiAddToCart, data),

  updateCart: (data) => http.patch(apiUpdateCart, data),

  removeFromCart: (data) => http.delete(apiRemoveCart, { data }),

  clearCart: (data) => http.post(apiClearCart, data),

  // Lấy toàn bộ đơn hàng có trạng thái "Paid" (chỉ Staff mới xem được)
  viewAllCart: (data) => http.post(apiViewCartStaff, data),

  // ✅ Cập nhật trạng thái đơn hàng từ "Paid" → "Shipped"
  updateOrderStatus: (data) => http.patch(apiUpdateOrderStatus, data),

  // ✅ Lấy lịch sử mua hàng (chỉ hiển thị đơn "Paid" cho bệnh nhân)
  getPurchaseHistory: (data) => http.post(apiGetPurchaseHistory, data),
  verify: (data) => http.patch(apiVerifyPayment, data),
};

export default CartServices;
