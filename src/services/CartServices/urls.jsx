export const apiCart = "/cart";

// API thêm sản phẩm vào giỏ hàng
export const apiAddToCart = `${apiCart}/add`;  // POST

// API lấy giỏ hàng (sử dụng POST thay vì GET)
export const apiGetCart = `${apiCart}/get`;  // POST

// API cập nhật số lượng sản phẩm trong giỏ hàng (PATCH thay vì PUT)
export const apiUpdateCart = `${apiCart}/update`;  // PATCH

// API xóa sản phẩm khỏi giỏ hàng (DELETE thay vì POST)
export const apiRemoveCart = `${apiCart}/remove`;  // DELETE
export const apiClearCart = `${apiCart}/clear`; // Thêm API clearCart

