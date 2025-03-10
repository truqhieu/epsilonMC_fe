export const apiCart = "/cart";

// API thêm sản phẩm vào giỏ hàng
export const apiAddToCart = `${apiCart}/add`;  // POST

// API lấy giỏ hàng (sử dụng POST thay vì GET)
export const apiGetCart = `${apiCart}/get`;  // POST

// API cập nhật số lượng sản phẩm trong giỏ hàng (PATCH thay vì PUT)
export const apiUpdateCart = `${apiCart}/update`;  // PATCH

// API xóa sản phẩm khỏi giỏ hàng (DELETE thay vì POST)
export const apiRemoveCart = `${apiCart}/remove`;  // DELETE

// API xóa toàn bộ giỏ hàng sau khi thanh toán
export const apiClearCart = `${apiCart}/clear`;  // POST

// API lấy danh sách đơn hàng (chỉ hiển thị đơn "Paid" cho Staff)
export const apiViewCartStaff = `${apiCart}/trang-thai-don-hang`;  // POST

// API cập nhật trạng thái đơn hàng từ "Paid" → "Shipped"
export const apiUpdateOrderStatus = `${apiCart}/update-status`;  // PATCH
