import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { message } from "antd";
import { PlusCircleOutlined, ShoppingCartOutlined } from "@ant-design/icons"; // ✅ Import ShoppingCartOutlined
import ProductServices from "../../../services/ProductServices";
import CartServices from "../../../services/CartServices";
import "./styles.css";

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const accountId = user?.accountId;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await ProductServices.getAllProducts();
        if (!response || !Array.isArray(response)) {
          throw new Error("Dữ liệu không hợp lệ");
        }
        setProducts(response);
      } catch (error) {
        setError("Không thể tải danh sách sản phẩm.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/chi-tiet-san-pham/${productId}`);
  };

  const addToCart = async (productId) => {
    try {
      if (!accountId) {
        message.warning("Bạn cần đăng nhập để thêm vào giỏ hàng!");
        return;
      }

      const response = await CartServices.addToCart({ accountId, productId, quantity: 1 });

      if (response.success) {
        message.success("Đã thêm vào giỏ hàng");
      } else {
        message.error(response.message || "Lỗi khi thêm vào giỏ hàng");
      }
    } catch (error) {
      message.error("Lỗi kết nối máy chủ! Vui lòng thử lại.");
    }
  };

  return (
    <div className="container">
      {/* ✅ Thêm tiêu đề + Icon Giỏ Hàng */}
      <div className="header">
        <h2 className="title">SẢN PHẨM</h2>
        <ShoppingCartOutlined
          className="cart-icon"
          onClick={() => navigate("/gio-hang")} // ✅ Click vào để chuyển đến giỏ hàng
        />
      </div>

      {loading && <p>Đang tải dữ liệu...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && products.length > 0 ? (
        <div className="product-list">
          {products.map((product) => (
            <div key={product._id} className="product-card">
              <img
                src={product.image_urls?.[0] || "https://via.placeholder.com/150"}
                alt={product.name || "Sản phẩm"}
                className="product-image"
                onClick={() => handleProductClick(product._id)}
              />
              <div className="product-info">
                <h3 className="product-name">{product.name || "Không có tên"}</h3>
                <p className="product-price">
                  {product.price ? product.price.toLocaleString("vi-VN") + "đ" : "Liên hệ"}
                </p>
                <div className="product-actions">
                  <PlusCircleOutlined className="add-to-cart-icon" onClick={() => addToCart(product._id)} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !loading && !error && <p>Không có sản phẩm nào.</p>
      )}
    </div>
  );
};

export default ViewProducts;
