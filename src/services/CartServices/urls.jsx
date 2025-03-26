export const apiAddToCart = `cart/add`;

// API lấy giỏ hàng (sử dụng POST thay vì GET)
export const apiGetCart = `cart/get`;

// API cập nhật số lượng sản phẩm trong giỏ hàng (PATCH thay vì PUT)
export const apiUpdateCart = `cart/update`;

// API xóa sản phẩm khỏi giỏ hàng (DELETE thay vì POST)
export const apiRemoveCart = `cart/remove`;

// API xóa toàn bộ giỏ hàng sau khi thanh toán
export const apiClearCart = `cart/clear`;

// API lấy danh sách đơn hàng (chỉ hiển thị đơn "Paid" cho Staff)
export const apiViewCartStaff = `cart/trang-thai-don-hang`;

// API cập nhật trạng thái đơn hàng từ "Paid" → "Shipped"
export const apiUpdateOrderStatus = `cart/update-status`;

// API lấy lịch sử mua hàng (chỉ hiển thị đơn "Paid" cho bệnh nhân)
export const apiGetPurchaseHistory = `cart/lich-su-mua-hang`;
export const apiVerifyPayment = `cart/verify`;
